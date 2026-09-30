window.lesson10={
id:"reto",title:"Reto evaluable · Serverless AWS",navTitle:"10 · Reto evaluable",
hero:{eyebrow:"BLOQUE 10 · EVALUACIÓN",title:"Construye tu propia aplicación Serverless",description:"Ahora no replicas el Ebook. Transfiere lo aprendido a un caso nuevo y demuestra que comprendes arquitectura, permisos, integración, persistencia, notificación y diagnóstico.",chips:["EVALUABLE","Individual","Node.js","S3","API Gateway","Lambda","DynamoDB","SNS"]},
sections:[
{type:"flow",title:"Recorrido del reto · antes de empezar",items:["1 · INTERPRETA · requisitos","2 · DISEÑA · arquitectura + datos","3 · CONSTRUYE · frontend + backend","4 · INTEGRA · API + persistencia + evento","5 · PUBLICA · URL funcional","6 · DEMUESTRA · evidencias","7 · ENTREGA · repo + defensa"]},
{type:"warning",title:"Cambio de modo · ya no es un cuaderno guiado",text:"Los bloques 00–09 te enseñaban procedimientos y mostraban código completo. En este reto no encontrarás la solución ni comandos para copiar. Puedes consultar tus bloques anteriores, documentación oficial y tus propios apuntes. Debes decidir cómo aplicar lo aprendido."},

{type:"concept",title:"Situación de partida",text:"Una pequeña organización necesita una landing con un formulario para registrar solicitudes. Cada solicitud debe llegar a un backend Serverless, validarse, persistirse y generar una notificación. La solución debe poder demostrarse de extremo a extremo."},

{type:"tabs",label:"1 · ELIGE TU CASO",title:"Cinco nombres/contextos posibles",tabs:[
{title:"EventPass",intro:"Formulario para solicitar plaza en un evento tecnológico. Datos mínimos: nombre, email y evento/interés."},
{title:"TechMentor",intro:"Solicitud de mentoría tecnológica. Datos mínimos: nombre, email y área de ayuda."},
{title:"BookAlert",intro:"Solicitud para recibir información sobre una publicación. Datos mínimos: nombre, email y tema."},
{title:"CampusConnect",intro:"Registro de interés en una actividad del centro. Datos mínimos: nombre, email y actividad."},
{title:"GreenAction",intro:"Alta en una iniciativa sostenible. Datos mínimos: nombre, email y acción/interés."}
]},
{type:"concept",title:"Decisión",text:"Elige UNO de los cinco contextos. Puedes personalizar textos y diseño, pero no reducir los requisitos técnicos. El nombre de tus recursos debe ser coherente con el caso elegido."},

{type:"tabs",label:"2 · REQUISITOS",title:"Qué debe existir al terminar",tabs:[
{title:"Frontend",intro:"Landing estática publicada y accesible mediante URL. Debe contener un formulario funcional con al menos nombre, email y un tercer dato relacionado con el caso."},
{title:"API",intro:"Una API HTTP debe exponer una operación POST clara para recibir el formulario. Debes poder justificar ruta, método y stage."},
{title:"Lambda",intro:"Backend en Node.js. Debe interpretar el evento HTTP, validar datos obligatorios, controlar errores y devolver respuestas HTTP coherentes."},
{title:"DynamoDB",intro:"Cada solicitud válida debe persistirse con una partition key adecuada y atributos suficientes para reconstruir la solicitud. Debes justificar tu elección de clave."},
{title:"SNS",intro:"Cada solicitud válida debe publicar una notificación en un Topic con al menos una suscripción confirmada."},
{title:"Seguridad",intro:"Debes poder identificar el Execution Role de Lambda y explicar qué permisos necesita. No se admite resolver errores concediendo privilegios administrativos indiscriminados."}
]},

{type:"flow",title:"Arquitectura funcional mínima",items:["Usuario","Frontend estático","POST API Gateway","Lambda Node.js","DynamoDB · persistencia","SNS · publicación","Suscriptor · notificación"]},

{type:"concept",title:"Campos/requisitos definitivos del formulario",text:"El formulario tendrá exactamente tres campos funcionales mínimos: name (obligatorio), email (obligatorio) y interest (obligatorio, adaptado al contexto). Puedes añadir campos extra, pero no sustituyen estos tres. El backend debe validar los tres aunque el HTML también los marque como required."},

{type:"tabs",label:"3 · DECISIONES QUE DEBES DEFENDER",title:"No basta con que funcione",tabs:[
{title:"NoSQL",intro:"Explica por qué DynamoDB es razonable para TU patrón de acceso y qué cambiaría si necesitases relaciones/consultas complejas."},
{title:"Partition key",intro:"Justifica qué utilizas como clave y por qué. Evita una respuesta del tipo «porque lo hicimos en clase»."},
{title:"IAM",intro:"Distingue tus credenciales Academy del Execution Role de Lambda y los permisos de invocación API Gateway → Lambda."},
{title:"SNS",intro:"Explica por qué publicas en un Topic en vez de acoplar Lambda a un destinatario concreto."},
{title:"Errores",intro:"Debes saber dónde mirar ante 400, 403, 404, 500, CORS, AccessDenied y ResourceNotFound."}
]},

{type:"concept",title:"4 · Orden recomendado de construcción · orientación, no solución",text:"Trabaja por capas verificables. No conectes seis servicios a la vez. Una secuencia razonable es: frontend local → publicación estática → Lambda aislada → API probada sin navegador → DynamoDB aislada → Lambda+DynamoDB → SNS aislado → Lambda+SNS → frontend End-to-End. Puedes adaptar el orden si justificas cómo mantienes pruebas intermedias."},

{type:"checklist",title:"Checkpoints técnicos obligatorios",items:[
"Frontend accesible mediante URL pública.",
"POST probado independientemente del frontend.",
"Lambda devuelve éxito y error controlado.",
"CloudWatch muestra una invocación identificable.",
"DynamoDB contiene un item generado por una solicitud real.",
"El item posee una partition key justificable.",
"SNS Topic existe y la suscripción está confirmada.",
"Una solicitud real genera una notificación.",
"El formulario publicado completa el recorrido End-to-End.",
"Puedes identificar qué identidad/role realiza cada acción AWS."
]},

{type:"tabs",label:"5 · EVIDENCIAS",title:"Qué debes entregar para demostrarlo",tabs:[
{title:"Repositorio",intro:"Repositorio GitHub propio con frontend y código Node.js. README con arquitectura, instrucciones de prueba y decisiones principales. No incluyas credenciales, tokens ni secretos."},
{title:"Arquitectura",intro:"Diagrama sencillo y legible con usuario/frontend/API Gateway/Lambda/DynamoDB/SNS/suscriptor y sentido de las flechas."},
{title:"URLs",intro:"URL pública del frontend y endpoint/ruta de la API necesarios para la corrección. No publiques credenciales."},
{title:"Capturas",intro:"Evidencias mínimas: petición HTTP correcta, item DynamoDB, CloudWatch y notificación SNS. Deben corresponder a tu ejecución."},
{title:"Defensa",intro:"El profesor podrá pedirte explicar una petición concreta de extremo a extremo y diagnosticar un supuesto de error sin modificar recursos al azar."}
]},

{type:"concept",title:"6 · Terraform · ampliación profesional",text:"Después de demostrar la arquitectura manual, puedes reconstruir infraestructura con Terraform. Debe incluir como mínimo DynamoDB, SNS, Lambda y API Gateway, reutilizando el Execution Role permitido por Learner Lab cuando corresponda. Debes enseñar plan antes de apply y demostrar destroy de los recursos gestionados por Terraform."},

{type:"tabs",label:"7 · RÚBRICA · 100 PUNTOS",title:"Criterios de evaluación visibles desde el inicio",tabs:[
{title:"Arquitectura · 15",intro:"Servicios correctamente elegidos/conectados, diagrama coherente y capacidad para explicar responsabilidades y flujo."},
{title:"Frontend + API · 15",intro:"Formulario funcional, publicación correcta, POST coherente, integración API Gateway y prueba HTTP demostrable."},
{title:"Lambda · 20",intro:"Node.js comprensible, validación backend, tratamiento de event/body, respuestas HTTP, errores y logs. Se valora poder explicar el código."},
{title:"DynamoDB · 15",intro:"Modelo coherente con access patterns, partition key justificada y persistencia real verificable."},
{title:"SNS · 10",intro:"Topic/suscripción correctos, confirmación y publicación real desde el flujo."},
{title:"IAM + diagnóstico · 15",intro:"Distingue identidades/permisos y diagnostica errores con evidencias (CloudWatch, Network, CLI) antes de modificar configuración."},
{title:"Entrega · 10",intro:"Repositorio limpio, README útil, evidencias suficientes, sin secretos y defensa individual coherente."}
]},

{type:"warning",title:"Condición de evaluación",text:"Que la aplicación «funcione» no garantiza la nota completa. Una solución copiada que el alumno no pueda explicar pierde los criterios asociados a comprensión, arquitectura, IAM y diagnóstico."},

{type:"checklist",title:"STOP · Antes de entregar",items:[
"Mi repositorio NO contiene Access Key, Secret Access Key ni Session Token.",
"Mi URL pública abre el frontend correcto.",
"Mi formulario realiza una petición real y puedo enseñarla en Network.",
"Puedo localizar la misma solicitud en DynamoDB.",
"Puedo enseñar la notificación SNS de esa solicitud.",
"Puedo localizar logs de esa ejecución.",
"Puedo explicar la partition key.",
"Puedo explicar Execution Role vs credenciales Academy.",
"Mi README permite al profesor entender/probar el proyecto.",
"Mi diagrama coincide con lo que realmente he construido."
]},

{type:"success",title:"Cierre del reto",text:"La entrega se considera terminada cuando puedes demostrar el sistema y explicar por qué funciona. El objetivo del Bloque 10 es transferir los aprendizajes 00–09 a una solución nueva sin depender de una receta paso a paso."}
]};