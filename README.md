# RASHS
(RESTful API Server Hiper Simple con Restify + Mongojs)

## Requisitos previos

* Nodejs (ver anexo abajo)
* Mongodb (ver anexo abajo)
* Git (opcional, ver anexo abajo)

### Uso de Mongodb
```
> mongo 						# inicia mongodb
> db 							# muestra la bd actual
> show dbs						# muestras las bds
> use mydb						# cambia la bd actual
> j = { name : "mongo" }		# crear objeto json
> k = { x : 3 }
> db.testData.insert( j )		# insertar objeto json en colección
> db.testData.insert( k )
> show collections				# mostrar colecciones de la db
> db.testData.find() 			# mostrar objetos de una colección
> db.collection.ensureIndex( 	# crear indice unique en un campo de una colección
	{ "campo": 1 }, 
	{ unique: true })
```

## Vídeotutorial

* [Ver en Youtube](proximamente)

## Anexo

* [Nodejs](http://nodejs.org/download/)
* [Mongodb](https://www.mongodb.org/downloads)
* [Repo Restify](https://github.com/mcavage/node-restify)
* [Repo Mongojs](https://github.com/mafintosh/mongojs)
* [Extensión Postman Rest Client](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)