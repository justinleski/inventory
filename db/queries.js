const pool = require("./pool");

async function getAllTea() {
    const { rows } = await pool.query(`
        SELECT
          tea_name.id,
          tea_name.tea_name,
          tea_name.decaf,
          tea_name.stock,
          tea_type.name AS type,
          country_origin.country_name AS country
        FROM tea_name
        JOIN tea_type ON tea_name.type_id = tea_type.id
        JOIN country_origin ON tea_name.country_id = country_origin.id;
      `);
    return rows;
}

async function insertTea(tea) {
    try {
        console.log('Inserting:', tea);
        await pool.query(
            `INSERT INTO tea_name (tea_name, decaf, stock, type_id, country_id)
             VALUES ($1, $2, $3, $4, $5)`,
            [tea.tea_name, tea.decaf === 'on', tea.stock, tea.type_id, tea.country_id]
        );
        console.log('Insert successful');
    } catch (err) {
        console.error('Error inserting tea:', err);
    }
}


async function removeTea(tea) {
    await pool.query("DELETE FROM tea_name WHERE id=($1)", [tea.id]);
}

/* =========================
 functions to filter on form
========================= */

async function filterByCountry(country_id) {
    const { rows } = await pool.query(
        `
        SELECT * FROM tea_name WHERE country_id=($1)
        `, [country_id]

    );

    return rows;
}

async function filterByTeaType(type_id) {
    const { rows } = await pool.query(
        `
        SELECT * FROM tea_name WHERE type_id=($1)
        `, [type_id]

    );

    return rows;
}

async function filterByStock() {
    const { rows } = await pool.query(
        `
        SELECT * FROM tea_name ORDER BY stock
        `

    );

    return rows;
}

/* =========================
 functions to get form options
========================= */
async function getTeaTypeOptions(){
    const { rows } = await pool.query(
        `
      
        SELECT * FROM tea_type 
        `
    );

    return rows;
}

async function getCountryOptions(){
    const { rows } = await pool.query(
        `
        SELECT * FROM country_origin 
        `
    );

    return rows;
}

module.exports = {

    getAllTea, insertTea, removeTea,
    filterByCountry, filterByTeaType, filterByStock,
    getTeaTypeOptions, getCountryOptions,

}