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

{type:"concept",title:"3 · Mini-reto práctico · serverless-check",text:"Crea una NUEVA Lambda llamada serverless-check. Recibirá un nombre y devolverá un mensaje de confirmación. Después expondrás esa Lambda mediante una REST API llamada serverless-check-api con POST /check y stage dev."},

{type:"codelearning",label:"ÚNICO CÓDIGO QUE TE DAMOS",title:"La lógica de serverless-check",filename:"index.mjs",text:"La actividad evalúa recuperación de AWS, no inventar JavaScript. Por eso sí proporcionamos la lógica, pero debes ser capaz de explicarla.",code:"// Lambda recibe un event y busca la propiedad nombre.\nexport const handler = async (event) => {\n  const nombre = event.nombre ?? 'alumno';\n\n  // Devolvemos una respuesta sencilla para reconocer la ejecución.\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      message: 'Repaso superado por ' + nombre\n    })\n  };\n};",after:{title:"ANTES DE CREAR",text:"Predice qué devolverá si event = { nombre: 'Alberto' }. Después explica handler, event, ??, statusCode y JSON.stringify."}},

{type:"tabs",label:"4 · CONSTRUYE CON AUTONOMÍA",title:"Requisitos · tú decides los pasos",tabs:[
{title:"Lambda",intro:"Crea serverless-check con Node.js, arquitectura x86_64 y el Execution Role permitido por Learner Lab. Debes poder probarla directamente con un Test Event."},
{title:"Test Event",intro:"Crea un evento que contenga nombre. La respuesta debe incluir Repaso superado por ..."},
{title:"REST API",intro:"Crea serverless-check-api como REST API Regional."},
{title:"Ruta + método",intro:"Crea /check y POST. Integra el método con serverless-check mediante Lambda proxy integration."},
{title:"Permiso",intro:"Comprueba que API Gateway puede invocar Lambda. No confundas este permiso con el Execution Role."},
{title:"Deploy",intro:"Publica la API en un stage dev y localiza la Invoke URL."}
]},

{type:"tabs",label:"5 · AYUDAS PROGRESIVAS",title:"Ábrelas sólo si te bloqueas",tabs:[
{title:"Pista · Lambda",intro:"AWS Console → Lambda → Functions → Create function. Recupera del Bloque 03 qué significan Author from scratch, Runtime y Execution Role."},
{title:"Pista · API",intro:"API Gateway → REST API → Resources. Piensa en el orden: recurso /check → método POST → integración Lambda."},
{title:"Pista · Publicación",intro:"Crear Resources/Methods no publica una REST API. Recupera los conceptos Deployment y Stage."},
{title:"Pista · Error 403/404",intro:"Comprueba método, ruta, stage, deployment y permiso de invocación antes de modificar Lambda."},
{title:"Pista · Logs",intro:"Si API Gateway llega a Lambda pero el resultado no es el esperado, Monitor/CloudWatch te permite observar la invocación."}
]},

{type:"wizard",label:"6 · DEMUESTRA",title:"No basta con decir «funciona»",steps:[
{shortTitle:"Lambda",title:"Prueba directa",learn:"Primero aislamos Lambda.",text:"Ejecuta tu Test Event.",expected:"Respuesta 200 con Repaso superado por TU_NOMBRE.",success:"Lambda aislada ✓.",help:[["Falla","Código → Deploy → Test Event → resultado."]],check:"Enseña entrada y salida."},
{shortTitle:"API",title:"Prueba HTTP",learn:"Ahora comprobamos la capa API Gateway.",text:"Utiliza curl desde Git Bash contra TU URL POST /dev/check. Construye tú el comando.",expected:"Recibes una respuesta HTTP procedente de serverless-check.",success:"API → Lambda ✓.",help:[["Pista curl","Necesitas método POST, Content-Type application/json y un body JSON."],["Respuesta usa alumno","Piensa en la forma del event cuando hay Lambda proxy: observa CloudWatch."]],check:"Guarda la evidencia del request/response."},
{shortTitle:"Logs",title:"Encuentra tu invocación",learn:"La observabilidad forma parte del sistema.",text:"Localiza en CloudWatch la ejecución provocada por tu prueba HTTP.",expected:"Puedes relacionar hora/petición con una invocación concreta.",success:"Observabilidad ✓.",help:[["No hay logs","Comprueba que API Gateway llegó realmente a Lambda y que el role permite logging."]],check:"No cierres sin localizar una ejecución."}
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