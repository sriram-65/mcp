const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/data.txt');

class Resource {
    static async getAll() {
        try {
            const data = fs.readFileSync(dataFilePath, 'utf-8');
            return data
                .split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    const [title, description, fileUrl] = line.split('|').map(item => item.split(':')[1].trim());
                    return { title, description, fileUrl };
                });
        } catch (err) {
            console.error('Error reading file:', err);
            return [];
        }
    }

    static async create({ title, description, fileUrl }) {
        try {
            const newEntry = `Title: ${title} | Description: ${description} | File: ${fileUrl}\n`;
            fs.appendFileSync(dataFilePath, newEntry);
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }
}

module.exports = Resource;
