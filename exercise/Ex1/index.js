const fs = require('fs')
const csv = require('csv-parser')

// Delete file if it's exist
function delete_file() {
    canada_file = "canada.txt" 
    usa_file = "usa.txt"
    if(fs.existsSync(canada_file)) {
        fs.unlink(canada_file, function (err) {
            if (err) throw err;
            console.log(`File ${canada_file} deleted!`);
          });
    }

    if(fs.existsSync(usa_file)) {
        fs.unlink(usa_file, function (err) {
            if (err) throw err;
            console.log(`File ${usa_file} deleted!`);
          });
    }

}

// Read data of Canada and crete new file
function read_data_of_canada() {
    const countries_file = 'input_countries.csv';
    canada_file = "canada.txt" 
    fs.appendFile(canada_file, `country,year,population\n`, function (err) {
        if (err) throw err;
    });
    fs.createReadStream(countries_file)
        .pipe(csv())
        .on('data', (row) => {
           if(row["country"] == "Canada") {
                data = row["country"] + "," + row["year"] + "," + row["population"]
                fs.appendFile(canada_file, `${data}\n`, function (err) {
                    if (err) throw err;
                });
           }
        })
        .on('end', () => {
            console.log(`CSV file successfully processed and created new ${canada_file}`);
        });
}

// Read data of USA and crete new file
function read_data_of_usa() {
    const countries_file = 'input_countries.csv';
    usa_file = "usa.txt"
    fs.appendFile(usa_file, `country,year,population\n`, function (err) {
        if (err) throw err;
    });
    fs.createReadStream(countries_file)
        .pipe(csv())
        .on('data', (row) => {
           if(row["country"] == "United States") {
                data = row["country"] + "," + row["year"] + "," + row["population"]
                fs.appendFile(usa_file, `${data}\n`, function (err) {
                    if (err) throw err;
                });
           }
        })
        .on('end', () => {
            console.log(`CSV file successfully processed and created new ${usa_file}`);
        });
}

delete_file();
read_data_of_canada();
read_data_of_usa();