const mysql =require('mysql');
const express =require('express');
var app =express();
const bodyparser=require('body-parser')


app.use(bodyparser.json());


var mysqlConnection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'microcredito',
    multipleStatements:true

});

mysqlConnection.connect((err =>{
    if(!err)
    console.log('banco conectado');
    else
    console.log('conexão falha'+JSON.stringify(err,undefined,2));

}));

app.listen(3000,()=>{
    console.log('express rodando')
});
//empreendedoras
//lista a empreendedora por id
app.get('/empreendedoras/:id',(res,req)=>{
    mysqlConnection.query('SELECT * FROM empreendedoras WHERE id=?',[req.params.id],(err,  rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})
//exclui uma empreendedora
app.delete('/empreendedoras/:id',(res,req)=>{
    mysqlConnection.query('DELETE FROM empreendedoras WHERE id=?',[req.params.id],(err,  rows,fields)=>{
        if(!err)
        res.send('EXCLUIDO COM SUCESSO');
        else
        console.log(err);
    })
})
//insere uma empreendedora
app.post('/empreendedoras/',(res,req)=>{
    let emp =req.body;
    var sql="SET @id =?;SET @nome=?;SET @cpf=?;SET @genero=?;SET @estado_civil=?;SET @data_de_nascimento=?;SET @email=?;SET @trabalha_registrada=?;SET @faturamento=?;SET @produz_algo=?;SET @tipo_servico=?;SET @score=?;\
    CALL EmpreendedoraAddOrEdit(@id,@nome,@cpf,@genero,@estado_civil,@data_de_nascimento,@email,@trabalha_registrada,@faturamento,@produz_algo,tipo_servico,@score);"
    mysqlConnection.query(sql,[emp.id,emp.nome,emp.cpf,emp.genero,emp.estado_civil,emp.data_de_nascimento,emp.email,emp.trabalha_registrada,emp.faturamento,emp.produz_algo,emp.tipo_servico,emp.score],[req.params.id],(err,  rows,fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor==Array)
            res.send('inserido com sucesso')
        });
        else
        console.log(err);
    })
    //atualiza uma empreendedora
    app.put('/empreendedoras/',(res,req)=>{
        let emp =req.body;
        var sql="SET @id =?;SET @nome=?;SET @cpf=?;SET @genero=?;SET @estado_civil=?;SET @data_de_nascimento=?;SET @email=?;SET @trabalha_registrada=?;SET @faturamento=?;SET @produz_algo=?;SET @tipo_servico=?;SET @score=?; ;\
        CALL EmployeeAddOrEdit(@id,@nome,@cpf,@genero,@estado_civil,@data_de_nascimento,@email,@trabalha_registrada,@faturamento,@produz_algo,tipo_servico,@score);"
        mysqlConnection.query(sql,[emp.id,emp.nome,emp.cpf,emp.data_de_nascimento,emp.email,emp.faturamento,emp.servico,emp.score],[req.params.id],(err,  rows,fields)=>{
            if(!err)rows.forEach(element => {
            if(element.constructor==Array)
            res.send('atualizado com sucesso com sucesso')
            });
            else
            console.log(err);
        })
})


//agora vamos falar dos bancos

//consulta um banco pelo id
app.get('/bancos/:id',(res,req)=>{
    mysqlConnection.query('SELECT * FROM bancos WHERE id=?',[req.params.id],(err,  rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})

//exclui um banco
app.delete('/bancos/:id',(res,req)=>{
    mysqlConnection.query('DELETE FROM bancos WHERE id=?',[req.params.id],(err,  rows,fields)=>{
        if(!err)
        res.send('EXCLUIDO COM SUCESSO');
        else
        console.log(err);
    })
})

//insere um banco
app.post('/bancos/',(res,req)=>{
    let ban =req.body;
    var sql="SET @id =?;SET @nome=?,SET @cnpj=?,SET @taxa_de_juros=?;"
    mysqlConnection.query(sql,[ban.id,camp.nome,emp.cpf,emp.data_de_nascimento,emp.email,emp.faturamento,emp.servico,emp.score],[req.params.id],(err,  rows,fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor==Array)
            res.send('inserido com sucesso')
        });
        else
        console.log(err);
    })


    //atauliza um banco
    app.put('/bancos/',(res,req)=>{
        let ban =req.body;
        var sql="SET @id =?;SET @nome=?,SET @cnpj=?,SET @taxa_de_juros=?;\
        CALL EmployeeAddOrEdit(@id,@nome,@cnpj,@taxa_de_juros);"
        mysqlConnection.query(sql,[ban.id,ban.nome,ban.cnpj],[req.params.id],(err,  rows,fields)=>{
            if(!err)rows.forEach(element => {
            if(element.constructor==Array)
            res.send('atualizado com sucesso com sucesso')
            });
            else
            console.log(err);
        })
})

})})
