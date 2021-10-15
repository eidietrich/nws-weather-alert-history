// Node script that looks at all versions of file in ./history and pulls in most recent entry for each unique Montana fire

const fs = require('fs')
const glob = require('glob')

const getJson = (path) => {
    // console.log(path)
    try {
        return JSON.parse(fs.readFileSync(path))
    } catch (error) {
        console.log('File read error', path)
        return {}
    }
}
const collectJsons = (glob_path) => {
    const files = glob.sync(glob_path)
    return files.map(getJson)
}
const writeJson = (path, data) => {
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Written to', path);
    }
    );
}

const FILES_GLOB = './history/*.json'

const raw = collectJsons(FILES_GLOB)

const allEntries = raw.map(d => d.markers || []).flat()

/* Data shape
{
  name: 'Alisal Fire',
  type: 'Wildfire',
  summary: 'The Alisal Fire started on October 11, 2021 at 2:10 pm near the...',
  state: 'CALIFORNIA',
  updated: '2021-10-15 13:35:34',
  lat: '34.517',
  lng: '-120.131',
  size: '16,901 Acres',
  url: '/incident/7862/',
  id: '7862',
  contained: '41'
}

*/

const mtEntries = allEntries
    .filter(d => d.state && d.state === 'MONTANA')
    .sort((a, b) => new Date(a.updated) - Date(b.updated)) // newest entries first

const mtFireIds = Array.from(new Set(mtEntries.map(d => d.id)))
console.log(mtFireIds)
const mtFires = mtFireIds.map(id => mtEntries.find(d => d.id === id))

writeJson('montana-all-season-entries.json', mtFires)

console.log('Montana fires:', mtFires.length)