window.lesson04review={
id:"repaso-api",title:"Actividad de repaso · Hasta API Gateway",navTitle:"REPASO · Hasta API Gateway",
hero:{eyebrow:"ACTIVIDAD DE REPASO · NO EVALUABLE",title:"¿Puedes reconstruir lo aprendido sin seguir una receta?",description:"Antes de avanzar al frontend conectado, recupera S3, Lambda, API Gateway, AWS Academy, permisos y diagnóstico mediante una miniarquitectura nueva.",chips:["45–60 min","Individual","Repaso","S3","Lambda","API Gateway","CloudWatch"]},
sections:[
{type:"flow",title:"Lo que estás repasando",items:["Entorno + AWS Academy","Web estática + S3","Lambda Node.js","Execution Role","API Gateway REST","POST + integración","Stage + URL","curl + CloudWatch"]},
{type:"concept",title:"Objetivo de la actividad",text:"Construir una pequeña API de confirmación llamada serverless-check y demostrar que sabes explicar el recorrido Cliente → API Gateway → Lambda → respuesta. Además deberás relacionarla con la web S3 que ya construiste. No añadimos DynamoDB ni SNS: todavía no los has aprendido."},
{type:"warning",title:"Modo repaso",text:"No es evaluación. Intenta resolver cada fase sin volver inmediatamente a los bloques anteriores. Si te bloqueas, utiliza las ayudas progresivas. El objetivo es descubrir qué necesitas recuperar antes de continuar."},

{type:"tabs",label:"1 · ANTES DE TOCAR AWS",title:"Reconstruye el mapa mental",tabs:[
{title:"Tu dibujo",intro:"En papel o en tu cuaderno dibuja: Usuario → Web estática → API Gateway → Lambda → respuesta. Añade dónde colocarías S3 y dónde observarías logs."},
{title:"Explícalo",intro:"Debes poder decir en una frase qué responsabilidad tiene S3, Lambda, API Gateway y CloudWatch."},
{title:"Permisos",intro:"Marca dos identidades diferentes: TÚ operando con credenciales temporales de Academy y LAMBDA ejecutándose con su Execution Role."},
{title:"Checkpoint",intro:"No empieces a crear recursos hasta poder explicar el dibujo sin utilizar nombres de botones de la consola."}
]},

{type:"wizard",label:"2 · RECUPERA TU LABORATORIO",title:"Demuestra que el punto de partida sigue funcionando",steps:[
{shortTitle:"Academy",title:"Comprueba identidad y región",learn:"Antes de diagnosticar AWS debemos saber que Learning Lab sigue activo.",text:"Sin mirar el Bloque 00, utiliza los comandos que recuerdes para demostrar identidad y región.",expected:"Puedes enseñar el Account/Arn de tu sesión y decir en qué región estás.",success:"Entorno válido.",help:[["Pista 1","Necesitas AWS CLI."],["Pista 2","Recuerda los comandos sts get-caller-identity y configure get region."]],check:"Si Academy ha caducado, resuélvelo antes de continuar."},
{shortTitle:"S3",title:"Demuestra que recuerdas qué hicimos con la web",learn:"No vamos a crear otra web. Recuperamos el concepto.",text:"Localiza el bucket/web del Ebook y explica: qué contiene, qué significa website hosting y por qué pudo aparecer un 403.",expected:"Distingues objetos, configuración website y acceso público/policy.",success:"S3 recuperado.",help:[["Pista","Un bucket con index.html puede existir y aun así no ser legible públicamente."]],check:"Debes poder explicar S3 sin repetir comandos de memoria."}
]},

{type:"concept",title:"3 · Mini laboratorio HTTP · cinco Lambdas",text:"Vas a crear cinco funciones pequeñas e independientes. No hay DynamoDB: simulamos operaciones para concentrarnos en HTTP, paso de parámetros, event, respuesta y logs. GET consulta, POST crea, PUT actualiza/reemplaza, PATCH realiza una actualización parcial y DELETE elimina."},
{type:"warning",title:"Aclaración · UPDATE no es un método HTTP",text:"En lenguaje CRUD hablamos de UPDATE, pero HTTP no tiene un método llamado UPDATE. Practicaremos dos formas habituales: PUT para actualizar/reemplazar el recurso y PATCH para modificar sólo algunos campos."},
{type:"flow",title:"Mapa del mini laboratorio",items:["GET /items/{id} → lambda-get-item","POST /items → lambda-post-item","PUT /items/{id} → lambda-put-item","PATCH /items/{id} → lambda-patch-item","DELETE /items/{id} → lambda-delete-item"]},

{type:"codelearning",label:"LAMBDA 1 · GET",title:"lambda-get-item · recibe un parámetro de ruta",filename:"index.mjs",text:"Queremos ver cómo llega un id en pathParameters. No consultamos todavía una base de datos.",code:"export const handler = async (event) => {\n  // LOG 1 · Observamos TODO el evento recibido.\n  console.log('EVENT GET:', JSON.stringify(event));\n\n  // API Gateway colocará {id} dentro de pathParameters.\n  const id = event.pathParameters?.id ?? 'sin-id';\n  console.log('ID recibido:', id);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'GET',\n      id,\n      message: 'Consultando el recurso ' + id\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"Ruta /items/25 → pathParameters.id → 25. Después localiza ese mismo 25 en CloudWatch."}},

{type:"codelearning",label:"LAMBDA 2 · POST",title:"lambda-post-item · recibe datos en el body",filename:"index.mjs",text:"POST representa creación. Los datos llegan en event.body como JSON en texto y debemos convertirlos.",code:"export const handler = async (event) => {\n  console.log('EVENT POST:', JSON.stringify(event));\n\n  // Convertimos el texto JSON del body en objeto JavaScript.\n  const body = JSON.parse(event.body ?? '{}');\n  console.log('BODY recibido:', body);\n\n  return {\n    statusCode: 201,\n    body: JSON.stringify({\n      operation: 'POST',\n      received: body,\n      message: 'Recurso recibido para crear'\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"POST no necesita id en la ruta para este ejemplo: enviamos datos mediante body. Observa la diferencia entre event.body (texto) y body (objeto)."}},

{type:"codelearning",label:"LAMBDA 3 · PUT",title:"lambda-put-item · id en ruta + datos en body",filename:"index.mjs",text:"PUT combina dos entradas: qué recurso queremos actualizar (id) y cuáles serán sus datos (body).",code:"export const handler = async (event) => {\n  console.log('EVENT PUT:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  const body = JSON.parse(event.body ?? '{}');\n\n  console.log('ID a actualizar:', id);\n  console.log('Nuevos datos:', body);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'PUT',\n      id,\n      newData: body,\n      message: 'Actualización completa simulada'\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"PUT /items/25 + body JSON → pathParameters.id y event.body llegan juntos en la misma invocación."}},

{type:"codelearning",label:"LAMBDA 4 · PATCH",title:"lambda-patch-item · UPDATE parcial",filename:"index.mjs",text:"PATCH representa nuestro UPDATE parcial: sólo enviamos el campo que queremos modificar.",code:"export const handler = async (event) => {\n  console.log('EVENT PATCH:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  const changes = JSON.parse(event.body ?? '{}');\n\n  console.log('ID a modificar:', id);\n  console.log('Cambios parciales:', changes);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'PATCH',\n      id,\n      changes,\n      message: 'Actualización parcial simulada'\n    })\n  };\n};",after:{title:"PUT vs PATCH",text:"PUT practica una actualización/reemplazo completo; PATCH envía sólo cambios parciales. En ambos casos todavía simulamos: no existe persistencia."}},

{type:"codelearning",label:"LAMBDA 5 · DELETE",title:"lambda-delete-item · identifica qué recurso eliminar",filename:"index.mjs",text:"DELETE necesita saber qué recurso se pretende eliminar. El id llega en la ruta.",code:"export const handler = async (event) => {\n  console.log('EVENT DELETE:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  console.log('ID a eliminar:', id);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'DELETE',\n      id,\n      message: 'Eliminación simulada del recurso ' + id\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"DELETE /items/25 → necesitamos identificar 25, pero normalmente no necesitamos enviar un objeto completo en body."}},

{type:"tabs",label:"4 · TEST 1 · AWS LAMBDA",title:"Primero prueba cada Lambda directamente en la plataforma",tabs:[
{title:"GET",intro:"Test Event simulado: reproduce la parte de event que después generará API Gateway.",code:"{\n  \"pathParameters\": { \"id\": \"25\" }\n}"},
{title:"POST",intro:"event.body debe ser un STRING que contiene JSON.",code:"{\n  \"body\": \"{\\\"name\\\":\\\"Teclado\\\",\\\"price\\\":25}\"\n}"},
{title:"PUT",intro:"Combina id + body.",code:"{\n  \"pathParameters\": { \"id\": \"25\" },\n  \"body\": \"{\\\"name\\\":\\\"Teclado Pro\\\",\\\"price\\\":35}\"\n}"},
{title:"PATCH",intro:"Sólo enviamos el cambio parcial.",code:"{\n  \"pathParameters\": { \"id\": \"25\" },\n  \"body\": \"{\\\"price\\\":30}\"\n}"},
{title:"DELETE",intro:"Sólo necesitamos identificar el recurso.",code:"{\n  \"pathParameters\": { \"id\": \"25\" }\n}"}
]},

{type:"concept",title:"5 · API Gateway · una API, cinco integraciones",text:"Crea una REST API de repaso. Diseña /items y /items/{id}. POST vive en /items. GET, PUT, PATCH y DELETE viven en /items/{id}. Cada método se integra mediante Lambda proxy con SU Lambda correspondiente. Después despliega stage dev."},
{type:"flow",title:"Mapa de rutas que debes conseguir",items:["POST /items → lambda-post-item","GET /items/{id} → lambda-get-item","PUT /items/{id} → lambda-put-item","PATCH /items/{id} → lambda-patch-item","DELETE /items/{id} → lambda-delete-item"]},

{type:"tabs",label:"6 · TEST 2 · THUNDER CLIENT",title:"Prueba visualmente desde VS Code",tabs:[
{title:"Antes de empezar",intro:"Abre VS Code → Thunder Client → New Request. Utiliza la Invoke URL real de tu stage dev. Observa Method, URL, Body, Status y Response en cada prueba."},
{title:"GET",intro:"Método GET. URL: .../dev/items/25. Sin body. Debes recibir id = 25."},
{title:"POST",intro:"Método POST. URL: .../dev/items. Body → JSON: { name: Teclado, price: 25 }. Debes recibir status 201 y received."},
{title:"PUT",intro:"Método PUT. URL: .../dev/items/25. Body JSON con name y price. Comprueba id + newData."},
{title:"PATCH",intro:"Método PATCH. URL: .../dev/items/25. Envía sólo { price: 30 }. Comprueba changes."},
{title:"DELETE",intro:"Método DELETE. URL: .../dev/items/25. Sin body. Comprueba el id eliminado de forma simulada."}
]},

{type:"codelearning",label:"7 · TEST 3 · CURL",title:"Repite las cinco operaciones desde Git Bash",filename:"Git Bash",text:"Ahora haces las mismas peticiones sin interfaz gráfica. Lee los comentarios: método, ruta y body deben coincidir con Thunder Client.",code:"# Sustituye por la URL base REAL de tu stage dev.\nAPI_URL='https://API_ID.execute-api.TU_REGION.amazonaws.com/dev'\n\n# GET · id viaja en la RUTA.\ncurl -i -X GET \"$API_URL/items/25\"\n\n# POST · datos viajan en BODY.\ncurl -i -X POST \"$API_URL/items\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"Teclado\",\"price\":25}'\n\n# PUT · id en RUTA + datos completos en BODY.\ncurl -i -X PUT \"$API_URL/items/25\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"Teclado Pro\",\"price\":35}'\n\n# PATCH · id en RUTA + sólo el CAMBIO en BODY.\ncurl -i -X PATCH \"$API_URL/items/25\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"price\":30}'\n\n# DELETE · id viaja en la RUTA.\ncurl -i -X DELETE \"$API_URL/items/25\"",after:{title:"COMPARA",text:"Las cinco llamadas son las mismas que hiciste en Thunder Client. Cambia la herramienta, no cambia HTTP."}},

{type:"tabs",label:"8 · LOGS · OBSERVA EL EVENT",title:"CloudWatch es parte obligatoria del repaso",tabs:[
{title:"GET/DELETE",intro:"Localiza pathParameters.id = 25 en el evento/log. Explica por qué no necesitas body."},
{title:"POST",intro:"Localiza event.body y explica por qué JSON.parse es necesario."},
{title:"PUT",intro:"Localiza simultáneamente pathParameters.id y event.body."},
{title:"PATCH",intro:"Comprueba que body sólo contiene el campo modificado."},
{title:"Comparación",intro:"AWS Test Event, Thunder Client y curl provocan invocaciones de la misma Lambda. Compara qué parte del event estás simulando directamente y qué parte construye API Gateway."}
]},

{type:"checklist",title:"Checkpoint CRUD HTTP · antes de continuar",items:[
"He creado cinco Lambdas independientes: GET, POST, PUT, PATCH y DELETE.",
"Puedo explicar por qué UPDATE se practica mediante PUT/PATCH y no mediante un método UPDATE.",
"He probado las cinco desde Test Event de Lambda.",
"He creado /items y /items/{id} en API Gateway.",
"Cada método invoca la Lambda correcta.",
"He desplegado el stage dev.",
"He probado las cinco operaciones con Thunder Client.",
"He probado las cinco operaciones con curl desde Git Bash.",
"Puedo distinguir parámetros de ruta y body.",
"Puedo localizar los valores recibidos en CloudWatch Logs.",
"Puedo explicar PUT vs PATCH.",
"Entiendo que todavía NO hay persistencia: las operaciones son simuladas."
]},

{type:"tabs",label:"7 · PREGUNTAS DE RECUPERACIÓN",title:"Explícalo sin tocar la consola",tabs:[
{title:"S3 vs Lambda",intro:"¿Por qué S3 puede servir nuestra web pero no sustituye a Lambda para ejecutar lógica de negocio?"},
{title:"Lambda vs API",intro:"¿Por qué tener una Lambda no significa tener automáticamente una URL HTTP para el navegador?"},
{title:"Role",intro:"¿Qué diferencia existe entre tus credenciales Academy y el Execution Role de Lambda?"},
{title:"Invocación",intro:"¿Qué permiso necesita API Gateway para poder invocar Lambda y por qué no es lo mismo que el Execution Role?"},
{title:"Deploy",intro:"¿Por qué una REST API puede estar configurada correctamente pero no reflejar cambios hasta volver a desplegar el stage?"},
{title:"Diagnóstico",intro:"Si curl devuelve 500, ¿qué evidencias mirarías antes de modificar recursos?"}
]},

{type:"checklist",title:"Checkpoint · preparado para continuar al Bloque 05",items:[
"Puedo explicar la arquitectura hasta API Gateway sin mirar el cuaderno.",
"Learning Lab y región están bajo control.",
"Recuerdo la función de S3 en nuestra arquitectura.",
"He creado y probado una Lambda Node.js nueva.",
"Sé qué es el Execution Role.",
"He creado una REST API con recurso y método.",
"He integrado API Gateway con Lambda.",
"He desplegado un stage y localizado su URL.",
"He probado la API desde Git Bash.",
"He utilizado CloudWatch como evidencia/diagnóstico."
]},
{type:"success",title:"Repaso completado",text:"Si puedes demostrar estos checkpoints, mañana puedes cerrar aquí la sesión. El Bloque 05 empezará otro día introduciendo un problema nuevo: conectar el navegador real con la API y comprender event.body/CORS."}
]};