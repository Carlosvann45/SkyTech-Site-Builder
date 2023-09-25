import glob from 'glob';
import fs from 'fs';

const allProperties = {
    components: [],
    containers: []
};

const componentFiles = glob.sync('src/components/**/properties.json');

for (const file of componentFiles) {
    const newJson = fs.readFileSync(file);

    allProperties.components.push(JSON.parse(newJson));
}

const containerFiles = glob.sync('src/containers/**/properties.json');

for (const file of containerFiles) {
    const newJson = fs.readFileSync(file);

    allProperties.containers.push(JSON.parse(newJson));

}

console.log(allProperties);

fs.writeFileSync('lib/properties.json', JSON.stringify(allProperties));