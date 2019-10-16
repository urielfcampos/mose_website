const knex = require('../connection')

async function addArtefact(artefact) {
  try {
    const artefactId = await knex('artefacts')
      .returning('id')
      .insert(artefact)
    return artefactId[0]
  } catch (error) {
    throw new Error(error)
  }
}

async function addIndicator(indicator) {
  try {
    const indicatorId = await knex('indicator')
      .returning('id')
      .insert(indicator)
    return indicatorId[0]
  } catch (error) {
    throw new Error(error)
  }
}
async function addExampleArtefact(exampleId, artefactId) {
  try {
    await knex('example_artefact').insert({
      example_id: exampleId,
      artefact_id: artefactId
    })
  } catch (error) {
    throw new Error(error)
  }
}
async function addExampleIndicator(exampleId, indicatorId) {
  try {
    await knex('example_indicator').insert({
      example_id: exampleId,
      indicator_id: indicatorId
    })
  } catch (error) {
    throw new Error(error)
  }
}

async function addExample(example) {
  const artefactIds = []
  const indicatorIds = []
  for (const artefact in example.artefacts) {
    artefactIds.push(await addArtefact(example.artefacts[artefact]))
  }
  for (const indicator in example.indicators) {
    indicatorIds.push(await addIndicator(example.indicators[indicator]))
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
    await addExampleArtefact(exampleId, artefactId)
  }

  for (const indicatorId of indicatorIds) {
    await addExampleIndicator(exampleId, indicatorId)
  }
}
async function updateExample(example) {
  const artefactIds = []
  const indicatorIds = []
  for (const artefact of example.artefacts) {
    if (artefact.hasOwnProperty('id')) {
      await knex('artefacts')
        .update({
          artefact_name: artefact.artefact_name,
          artefact_reason: artefact.artefact_reason,
          model: artefact.model,
          wayOfUse: artefact.wayOfUse
        })
        .where('id', artefact.id)
    } else {
      artefactIds.push(await addArtefact(artefact))
    }
  }
  for (const indicator of example.indicators) {
    if (indicator.hasOwnProperty('id')) {
      await knex('indicator')
        .update({
          indicator_name: indicator.indicator_name,
          indicator_reason: indicator.indicator_reason,
          wayOfAnalysis: indicator.wayOfAnalysis,
          wayOfCollection: indicator.wayOfCollection
        })
        .where('id', indicator.id)
    } else {
      indicatorIds.push(await addIndicator(indicator))
    }
  }
  for (const artefactId of artefactIds) {
    await addExampleArtefact(example.id, artefactId)
  }

  for (const indicatorId of indicatorIds) {
    await addExampleIndicator(example.id, indicatorId)
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
  const examplesJoinIndicator = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_indicator', 'example.id', 'example_indicator.example_id')
    .join('indicator', 'example_indicator.indicator_id', 'indicator.id')
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
async function getExamplesByFieldAndObjective(query) {
  const { fieldOfWork, objective } = query
  const examplesJoinArtefacts = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_artefact', 'example.id', 'example_artefact.example_id')
    .join('artefacts', 'example_artefact.artefact_id', 'artefacts.id')
    .where({
      'example.fieldOfWork': fieldOfWork,
      'example.objective': objective
    })
  const examplesJoinIndicator = await knex('example')
    .select('*', 'example.id as exampleId')
    .join('example_indicator', 'example.id', 'example_indicator.example_id')
    .join('indicator', 'example_indicator.example_id', 'indicator.id')
    .where({
      'example.fieldOfWork': fieldOfWork,
      'example.objective': objective
    })
  const mergedExample = mergeExamples(
    examplesJoinArtefacts,
    examplesJoinIndicator
  )
  return mergedExample
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
    const exampleKeys = Object.keys(exampleList)
    const keys = Object.keys(indicatorList)
    if (!exampleKeys.includes(String(indicator.exampleId))) {
      exampleList[indicator.exampleId] = {
        id: indicator.exampleId,
        fieldOfWork: indicator.fieldOfWork,
        objective: indicator.objective,
        indicators: [],
        artefacts: []
      }
    }
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
      indicators: destructureIfNotEmpty(indicatorList, example),
      artefacts: destructureIfNotEmpty(artefactsList, example)
    })
  }

  return mergedExamples
}

function destructureIfNotEmpty(object, key) {
  try {
    if (Object.keys(object).length === 0) {
      return []
    } else {
      return [...object[key]]
    }
  } catch (error) {}
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
  getExampleFields,
  getExamplesByFieldAndObjective
}
