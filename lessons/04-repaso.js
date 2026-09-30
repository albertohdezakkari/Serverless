window.lesson04review={
id:"repaso-api",title:"Actividad de repaso · Hasta API Gateway",navTitle:"REPASO · Hasta API Gateway",
hero:{eyebrow:"ACTIVIDAD DE REPASO · NO EVALUABLE",title:"Laboratorio Lambda + API Gateway",description:"Repasa únicamente el backend HTTP aprendido hasta aquí: cinco Lambdas, paso de parámetros, logs, rutas/métodos de API Gateway y pruebas desde tres clientes.",chips:["60–90 min","Individual","Lambda","API Gateway","Thunder Client","curl","CloudWatch"]},
sections:[
{type:"flow",title:"Recorrido de la actividad",items:["1 · Academy","2 · Cinco Lambdas Node.js","3 · Test Events","4 · CloudWatch","5 · REST API","6 · /items + /items/{id}","7 · GET/POST/PUT/PATCH/DELETE","8 · Thunder Client","9 · curl","10 · Compara event ✓"]},
{type:"concept",title:"Objetivo de la actividad",text:"Construir una API CRUD SIMULADA sin base de datos. Cada método HTTP invocará una Lambda distinta. El objetivo es dominar event, pathParameters, body, JSON.parse, logs, integración API Gateway y pruebas HTTP. No utilizamos S3, frontend, DynamoDB ni SNS."},
{type:"warning",title:"Modo repaso",text:"No es evaluación. Intenta resolver cada fase sin volver inmediatamente a los bloques anteriores. Si te bloqueas, utiliza las ayudas progresivas. El objetivo es descubrir qué necesitas recuperar antes de continuar."},

{type:"wizard",label:"1 · PUNTO DE PARTIDA",title:"Sólo necesitamos AWS Academy + backend",steps:[
{shortTitle:"Academy",title:"Comprueba Learning Lab",learn:"Todo el laboratorio ocurre en la cuenta temporal de AWS Academy.",text:"Comprueba identidad y región antes de crear las cinco Lambdas.",code:"# Identidad temporal de AWS Academy\naws sts get-caller-identity\n\n# Región donde crearás Lambda y API Gateway\naws configure get region",expected:"STS responde y conoces la región.",success:"Backend preparado.",help:[["ExpiredToken","Renueva las credenciales temporales del Learning Lab."],["Región vacía","Comprueba la región indicada por Academy/consola."]],check:"Lambda y API Gateway deben estar en la misma cuenta/región."},
{shortTitle:"Role",title:"Recuerda el Execution Role",learn:"Cada Lambda necesita una identidad de ejecución. En Learner Lab reutiliza el role permitido por Academy.",text:"Al crear las Lambdas identifica/selecciona el Execution Role disponible en el laboratorio.",expected:"Puedes explicar que este role pertenece a Lambda, no a tu terminal.",success:"IAM recuperado.",help:[["No aparece LabRole","No inventes nombres: utiliza el role que Learner Lab permita."],["AccessDenied","No intentes crear AdministratorAccess."]],check:"Credenciales Academy ≠ Execution Role Lambda."}
]},
{type:"concept",title:"2 · Cinco Lambdas · mini laboratorio HTTP",text:"Vas a crear cinco funciones pequeñas e independientes. No hay DynamoDB: simulamos operaciones para concentrarnos en HTTP, paso de parámetros, event, respuesta y logs. GET consulta, POST crea, PUT actualiza/reemplaza, PATCH realiza una actualización parcial y DELETE elimina."},
{type:"warning",title:"Aclaración · UPDATE no es un método HTTP",text:"En lenguaje CRUD hablamos de UPDATE, pero HTTP no tiene un método llamado UPDATE. Practicaremos dos formas habituales: PUT para actualizar/reemplazar el recurso y PATCH para modificar sólo algunos campos."},
{type:"flow",title:"Mapa del mini laboratorio",items:["GET /items/{id} → lambda-get-item","POST /items → lambda-post-item","PUT /items/{id} → lambda-put-item","PATCH /items/{id} → lambda-patch-item","DELETE /items/{id} → lambda-delete-item"]},

{type:"codelearning",label:"LAMBDA 1 · GET",title:"lambda-get-item · recibe un parámetro de ruta",filename:"index.mjs",text:"Queremos ver cómo llega un id en pathParameters. No consultamos todavía una base de datos.",code:"export const handler = async (event) => {\n  // LOG 1 · Observamos TODO el evento recibido.\n  console.log('EVENT GET:', JSON.stringify(event));\n\n  // API Gateway colocará {id} dentro de pathParameters.\n  const id = event.pathParameters?.id ?? 'sin-id';\n  console.log('ID recibido:', id);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'GET',\n      id,\n      message: 'Consultando el recurso ' + id\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"Ruta /items/25 → pathParameters.id → 25. Después localiza ese mismo 25 en CloudWatch."}},

{type:"codelearning",label:"LAMBDA 2 · POST",title:"lambda-post-item · recibe datos en el body",filename:"index.mjs",text:"POST representa creación. Los datos llegan en event.body como JSON en texto y debemos convertirlos.",code:"export const handler = async (event) => {\n  console.log('EVENT POST:', JSON.stringify(event));\n\n  // Convertimos el texto JSON del body en objeto JavaScript.\n  const body = JSON.parse(event.body ?? '{}');\n  console.log('BODY recibido:', body);\n\n  return {\n    statusCode: 201,\n    body: JSON.stringify({\n      operation: 'POST',\n      received: body,\n      message: 'Recurso recibido para crear'\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"POST no necesita id en la ruta para este ejemplo: enviamos datos mediante body. Observa la diferencia entre event.body (texto) y body (objeto)."}},

{type:"codelearning",label:"LAMBDA 3 · PUT",title:"lambda-put-item · id en ruta + datos en body",filename:"index.mjs",text:"PUT combina dos entradas: qué recurso queremos actualizar (id) y cuáles serán sus datos (body).",code:"export const handler = async (event) => {\n  console.log('EVENT PUT:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  const body = JSON.parse(event.body ?? '{}');\n\n  console.log('ID a actualizar:', id);\n  console.log('Nuevos datos:', body);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'PUT',\n      id,\n      newData: body,\n      message: 'Actualización completa simulada'\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"PUT /items/25 + body JSON → pathParameters.id y event.body llegan juntos en la misma invocación."}},

{type:"codelearning",label:"LAMBDA 4 · PATCH",title:"lambda-patch-item · UPDATE parcial",filename:"index.mjs",text:"PATCH representa nuestro UPDATE parcial: sólo enviamos el campo que queremos modificar.",code:"export const handler = async (event) => {\n  console.log('EVENT PATCH:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  const changes = JSON.parse(event.body ?? '{}');\n\n  console.log('ID a modificar:', id);\n  console.log('Cambios parciales:', changes);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'PATCH',\n      id,\n      changes,\n      message: 'Actualización parcial simulada'\n    })\n  };\n};",after:{title:"PUT vs PATCH",text:"PUT practica una actualización/reemplazo completo; PATCH envía sólo cambios parciales. En ambos casos todavía simulamos: no existe persistencia."}},

{type:"codelearning",label:"LAMBDA 5 · DELETE",title:"lambda-delete-item · identifica qué recurso eliminar",filename:"index.mjs",text:"DELETE necesita saber qué recurso se pretende eliminar. El id llega en la ruta.",code:"export const handler = async (event) => {\n  console.log('EVENT DELETE:', JSON.stringify(event));\n\n  const id = event.pathParameters?.id ?? 'sin-id';\n  console.log('ID a eliminar:', id);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      operation: 'DELETE',\n      id,\n      message: 'Eliminación simulada del recurso ' + id\n    })\n  };\n};",after:{title:"QUÉ DEBES APRENDER",text:"DELETE /items/25 → necesitamos identificar 25, pero normalmente no necesitamos enviar un objeto completo en body."}},

{type:"tabs",label:"3 · TEST 1 · AWS LAMBDA",title:"Primero prueba cada Lambda directamente en la plataforma",tabs:[
{title:"GET",intro:"Test Event simulado: reproduce la parte de event que después generará API Gateway.",code:"{\n  \"pathParameters\": { \"id\": \"25\" }\n}"},
{title:"POST",intro:"event.body debe ser un STRING que contiene JSON.",code:"{\n  \"body\": \"{\\\"name\\\":\\\"Teclado\\\",\\\"price\\\":25}\"\n}"},
{title:"PUT",intro:"Combina id + body.",code:"{\n  \"pathParameters\": { \"id\": \"25\" },\n  \"body\": \"{\\\"name\\\":\\\"Teclado Pro\\\",\\\"price\\\":35}\"\n}"},
{title:"PATCH",intro:"Sólo enviamos el cambio parcial.",code:"{\n  \"pathParameters\": { \"id\": \"25\" },\n  \"body\": \"{\\\"price\\\":30}\"\n}"},
{title:"DELETE",intro:"Sólo necesitamos identificar el recurso.",code:"{\n  \"pathParameters\": { \"id\": \"25\" }\n}"}
]},

{type:"concept",title:"4 · API Gateway · una API, cinco integraciones",text:"Crea una REST API de repaso. Diseña /items y /items/{id}. POST vive en /items. GET, PUT, PATCH y DELETE viven en /items/{id}. Cada método se integra mediante Lambda proxy con SU Lambda correspondiente. Después despliega stage dev."},
{type:"flow",title:"Mapa de rutas que debes conseguir",items:["POST /items → lambda-post-item","GET /items/{id} → lambda-get-item","PUT /items/{id} → lambda-put-item","PATCH /items/{id} → lambda-patch-item","DELETE /items/{id} → lambda-delete-item"]},

{type:"tabs",label:"5 · TEST 2 · THUNDER CLIENT",title:"Prueba visualmente desde VS Code",tabs:[
{title:"Antes de empezar",intro:"Abre VS Code → Thunder Client → New Request. Utiliza la Invoke URL real de tu stage dev. Observa Method, URL, Body, Status y Response en cada prueba."},
{title:"GET",intro:"Método GET. URL: .../dev/items/25. Sin body. Debes recibir id = 25."},
{title:"POST",intro:"Método POST. URL: .../dev/items. Body → JSON: { name: Teclado, price: 25 }. Debes recibir status 201 y received."},
{title:"PUT",intro:"Método PUT. URL: .../dev/items/25. Body JSON con name y price. Comprueba id + newData."},
{title:"PATCH",intro:"Método PATCH. URL: .../dev/items/25. Envía sólo { price: 30 }. Comprueba changes."},
{title:"DELETE",intro:"Método DELETE. URL: .../dev/items/25. Sin body. Comprueba el id eliminado de forma simulada."}
]},

{type:"codelearning",label:"6 · TEST 3 · CURL",title:"Repite las cinco operaciones desde Git Bash",filename:"Git Bash",text:"Ahora haces las mismas peticiones sin interfaz gráfica. Lee los comentarios: método, ruta y body deben coincidir con Thunder Client.",code:"# Sustituye por la URL base REAL de tu stage dev.\nAPI_URL='https://API_ID.execute-api.TU_REGION.amazonaws.com/dev'\n\n# GET · id viaja en la RUTA.\ncurl -i -X GET \"$API_URL/items/25\"\n\n# POST · datos viajan en BODY.\ncurl -i -X POST \"$API_URL/items\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"Teclado\",\"price\":25}'\n\n# PUT · id en RUTA + datos completos en BODY.\ncurl -i -X PUT \"$API_URL/items/25\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"Teclado Pro\",\"price\":35}'\n\n# PATCH · id en RUTA + sólo el CAMBIO en BODY.\ncurl -i -X PATCH \"$API_URL/items/25\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"price\":30}'\n\n# DELETE · id viaja en la RUTA.\ncurl -i -X DELETE \"$API_URL/items/25\"",after:{title:"COMPARA",text:"Las cinco llamadas son las mismas que hiciste en Thunder Client. Cambia la herramienta, no cambia HTTP."}},

{type:"tabs",label:"7 · LOGS · OBSERVA EL EVENT",title:"CloudWatch es parte obligatoria del repaso",tabs:[
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
{type:"success",title:"Repaso Lambda + API Gateway completado",text:"La actividad termina aquí. Has trabajado únicamente backend HTTP: Lambda, event, parámetros, body, logs, API Gateway, Thunder Client y curl. S3/frontend/DynamoDB/SNS quedan fuera de este repaso."}
]};