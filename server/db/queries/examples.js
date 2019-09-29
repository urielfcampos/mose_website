const knex = require('../connection')

async function addExample(example) {
  const artefactIds = []
  const indicatorIds = []
  for (const artefact in example.artefacts) {
    try {
      const artefactId = await knex('artefacts')
        .returning('id')
        .insert(example.artefacts[artefact])
      artefactIds.push(artefactId[0])
    } catch (error) {
      throw new Error(error)
    }
  }
  for (const indicator in example.indicators) {
    try {
      const indicatorId = await knex('indicator')
        .returning('id')
        .insert(example.indicators[indicator])
      indicatorIds.push(indicatorId[0])
    } catch (error) {
      throw new Error(error)
    }
  }
  const { objective, fieldOfWork, author } = example
  let exampleId
  try {
    exampleId = await knex('example')
      .returning('id')
      .insert({
        objective,
        fieldOfWork,
        author
      })
  } catch (error) {
    throw new Error(error)
  }
  // Tratar o objeto do knex...
  exampleId = exampleId[0]

  for (const artefactId of artefactIds) {
    try {
      await knex('example_artefact').insert({
        example_id: exampleId,
        artefact_id: artefactId
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  for (const indicatorId of indicatorIds) {
    try {
      await knex('example_indicator').insert({
        example_id: exampleId,
        indicator_id: indicatorId
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}
async function updateExample(example) {
  for (const artefact of example.artefacts) {
    // eslint-disable-next-line no-console
    console.log(artefact)
    await knex('artefacts')
      .update({
        artefact_name: artefact.artefact_name,
        artefact_reason: artefact.artefact_reason,
        model: artefact.model,
        wayOfUse: artefact.wayOfUse
      })
      .where('id', artefact.id)
  }
  for (const indicator of example.indicators) {
    await knex('indicator')
      .update({
        indicator_name: indicator.indicator_name,
        indicator_reason: indicator.indicator_reason,
        wayOfAnalysis: indicator.wayOfAnalysis,
        wayOfCollection: indicator.wayOfCollection
      })
      .where('id', indicator.id)
  }
  return knex('example')
    .update({
      objective: example.objective,
      fieldOfWork: example.fieldOfWork
    })
    .where('id', example.id)
    .then((result) => {
      return result
    })
}
async function getExampleById(id) {
  const examplesJoinArtefacts = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_artefact', 'example.id', 'example_artefact.example_id')
    .join('artefacts', 'example_artefact.artefact_id', 'artefacts.id')
    .join('users', 'users.id', 'example.author')
    .where('example.id', id)
  const examplesJoinIndicator = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_indicator', 'example.id', 'example_indicator.example_id')
    .join('indicator', 'example_indicator.example_id', 'indicator.id')
    .where('example.id', id)
  const mergedExample = mergeExamples(
    examplesJoinArtefacts,
    examplesJoinIndicator
  )
  return mergedExample
}

async function getExamples() {
  const examplesJoinArtefacts = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_artefact', 'example.id', 'example_artefact.example_id')
    .join('artefacts', 'example_artefact.artefact_id', 'artefacts.id')
    .join('users', 'users.id', 'example.author')
  const examplesJoinIndicator = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_indicator', 'example.id', 'example_indicator.example_id')
    .join('indicator', 'example_indicator.example_id', 'indicator.id')

  const mergedExample = mergeExamples(
    examplesJoinArtefacts,
    examplesJoinIndicator
  )
  return mergedExample
}
function deleteExample(id) {
  return knex('example')
    .del()
    .where('id', id)
    .then((result) => {
      return result
    })
}

function mergeExamples(artefacts, indicators) {
  const artefactsList = {}
  const indicatorList = {}
  const exampleList = {}
  if (artefacts.length !== 0) {
    for (const artefact of artefacts) {
      const exampleKeys = Object.keys(exampleList)
      const keys = Object.keys(artefactsList)
      if (!exampleKeys.includes(String(artefact.exampleId))) {
        exampleList[artefact.exampleId] = {
          id: artefact.exampleId,
          fieldOfWork: artefact.fieldOfWork,
          objective: artefact.objective,
          author: artefact.author,
          fullName: artefact.fullName,
          indicators: [],
          artefacts: []
        }
      }
      if (!keys.includes(String(artefact.exampleId))) {
        artefactsList[artefact.exampleId] = [
          {
            id: artefact.artefact_id,
            artefact_name: artefact.artefact_name,
            model: artefact.model,
            wayOfUse: artefact.wayOfUse,
            artefact_reason: artefact.artefact_reason
          }
        ]
      } else {
        artefactsList[artefact.exampleId].push({
          id: artefact.artefact_id,
          artefact_name: artefact.artefact_name,
          model: artefact.model,
          wayOfUse: artefact.wayOfUse,
          artefact_reason: artefact.artefact_reason
        })
      }
    }
  }
  if (indicators.length !== 0) {
    for (const indicator of indicators) {
      const keys = Object.keys(indicatorList)
      if (!keys.includes(String(indicator.exampleId))) {
        indicatorList[indicator.exampleId] = [
          {
            id: indicator.indicator_id,
            indicator_name: indicator.indicator_name,
            wayOfCollection: indicator.wayOfCollection,
            wayOfAnalysis: indicator.wayOfAnalysis,
            indicator_reason: indicator.indicator_reason
          }
        ]
      } else {
        indicatorList[indicator.exampleId].push({
          id: indicator.indicator_id,
          indicator_name: indicator.indicator_name,
          wayOfCollection: indicator.wayOfCollection,
          wayOfAnalysis: indicator.wayOfAnalysis,
          indicator_reason: indicator.indicator_reason
        })
      }
    }
  }
  const mergedExamples = []
  for (const example in exampleList) {
    mergedExamples.push({
      ...exampleList[example],
      indicators: destructureIfNotEmpty(indicatorList, example),
      artefacts: destructureIfNotEmpty(artefactsList, example)
    })
  }

  return mergedExamples
}

function destructureIfNotEmpty(object, key) {
  if (Object.keys(object).length === 0) {
    return []
  } else {
    return [...object[key]]
  }
}

async function getExampleFields() {
  const result = await knex('example').distinct('fieldOfWork')
  return result
}
module.exports = {
  addExample,
  getExampleById,
  getExamples,
  updateExample,
  deleteExample,
  getExampleFields
}
