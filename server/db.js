import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('/tmp/new_database.db');


export default db;
