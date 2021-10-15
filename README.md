# Inciweb history

Git scraper for [Inciweb](https://inciweb.nwcg.gov/) incident data

Files here:
* `inciweb-incidents.json` - Latest version of fire data displayed in Inciweb landing page
* `history-to-files.sh` - Writes all versions of inciweb-incidents.json to individual files in `/history` as 1st step in aggregation procedure
* `aggregate-mt-fires.js` - Aggregates versions of files in `/history` to pull out most recent Montana fires, writes to `montana-all-season-entries.js`