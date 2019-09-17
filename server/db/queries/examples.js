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
  await knex('artefacts')
    .update({
      artefact_name: example.artefact_name,
      artefact_reason: example.artefact_reason,
      model: example.model,
      wayOfUse: example.wayOfUse
    })
    .where('id', example.artefact_id)
  await knex('indicator')
    .update({
      indicator_name: example.indicator_name,
      indicator_reason: example.indicator_reason,
      wayOfAnalysis: example.wayOfAnalysis,
      wayOfCollection: example.wayOfCollection
    })
    .where('id', example.indicator_id)
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
function getExampleById(id) {
  return knex('example')
    .join('artefacts', 'artefacts.id', 'example.artefact_id')
    .join('indicator', 'indicator.id', 'example.indicator_id')
    .select()
    .where('example.id', id)
    .then((result) => {
      return result
    })
}

async function getExamples() {
  const examplesJoinArtefacts = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_artefact', 'example.id', 'example_artefact.example_id')
    .join('artefacts', 'example_artefact.artefact_id', 'artefacts.id')
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
  for (const artefact of artefacts) {
    const exampleKeys = Object.keys(exampleList)
    const keys = Object.keys(artefactsList)
    if (!exampleKeys.includes(String(artefact.exampleId))) {
      exampleList[artefact.exampleId] = {
        id: artefact.exampleId,
        fieldOfWork: artefact.fieldOfWork,
        objective: artefact.objective,
        author: artefact.author,
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
  const mergedExamples = []
  for (const example in exampleList) {
    mergedExamples.push({
      ...exampleList[example],
      indicators: [...indicatorList[example]],
      artefacts: [...artefactsList[example]]
    })
  }

  return mergedExamples
}

module.exports = {
  addExample,
  getExampleById,
  getExamples,
  updateExample,
  deleteExample
}
