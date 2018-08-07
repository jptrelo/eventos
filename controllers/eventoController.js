var async = require('async');
const con = require('../config/database');
let _ = require('lodash');
let moment = require('moment');
var mysql = require('mysql');

function parseElements(data, done){
    let result = data;
    _.forEach(result, function(item) {
        item.color = (!_.isEmpty(item.color)) ? JSON.parse(item.color) : item.color;
    });

    return done(result);
}

const obtenerEventos = (done) => {
    con.query('SELECT * FROM evento', (errors, result) => {
        
        return done(errors, result);
          
    });
};

const obtenerEventosByUserId = (userid, done) => {
    con.query('SELECT * FROM evento WHERE created_by = ' + userid, (errors, result) => {
       
        return done(errors, result);
        
    });
};

const obtenerEventosByEspacioId = (espacioid, done) => {
    con.query('SELECT * FROM evento WHERE id_espacio = ' + espacioid, (errors, result) => {
      
        return done(errors, result);
        
    });
};

const obtenerEventoById = (eventoid, done) => {
    con.query('SELECT * FROM evento WHERE idevento = ' + eventoid, (errors, result) => {
       
        return done(errors, result);
        
    });
};

const eliminarEvento = (eventoid, done) => {
    con.query('DELETE FROM evento WHERE idevento = ' + eventoid, (errors, result) => {
        return done(errors, result);
    });
};

const crearResgistro = (eventoParams, done) => {
    var params = eventoParams;
    var sql = "INSERT INTO evento SET ?";
    var inserts = params;
    sql = mysql.format(sql, inserts);
    
    con.query(sql, (error, evento) => {
        
        if (error) return done(error);

        return done(error, evento);
        
    });
};

const modificarRegistro = (eventoid, eventoParams, done) => {
    var params = eventoParams;
    var sql = "UPDATE evento SET ? WHERE idevento = " + eventoid;
    var inserts = params;
    sql = mysql.format(sql, inserts);

    con.query(sql, (error, evento) => {
        
        if (error) return done(error);

        return done(error, evento);
        
    });
};

module.exports = {
  obtenerEventos,
  obtenerEventosByUserId,
  obtenerEventosByEspacioId,
  obtenerEventoById,
  eliminarEvento,
  crearResgistro,
  modificarRegistro
};