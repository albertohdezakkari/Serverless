window.lesson01={
id:"arquitectura",title:"Descubre la arquitectura Serverless",navTitle:"01 · Arquitectura",
hero:{eyebrow:"BLOQUE 01 · MODELO MENTAL",title:"De una web a un sistema Serverless",description:"Antes de crear servicios, descubre qué problema resuelve cada pieza y por qué la necesitamos.",chips:["Serverless","S3","API Gateway","Lambda","DynamoDB","SNS","IAM"]},
sections:[
{type:"flow",title:"Recorrido del bloque · antes de empezar",items:["1 · Observa el problema","2 · Identifica responsabilidades","3 · Asigna servicios","4 · Construye el mapa mental","5 · Añade permisos y observabilidad","6 · Comprueba comprensión"]},
{type:"concept",title:"Objetivo del Bloque 01",text:"Todavía no crearás recursos. Al terminar debes poder dibujar la arquitectura objetivo y explicar POR QUÉ existe cada servicio antes de tocar AWS."},
{type:"concept",title:"Partimos del producto, no de AWS",text:"Tenemos una web de un Ebook. El usuario puede verla y rellenar un formulario. La pregunta importante es qué debe ocurrir detrás cuando pulsa ENVIAR."},
{type:"flow",title:"Lo que ve el usuario",items:["Visitar la web","Conocer el Ebook","Rellenar formulario","Enviar solicitud"]},
{type:"concept",title:"S3 · necesitamos alojar archivos",text:"HTML, CSS, JavaScript e imágenes necesitan un lugar desde el que servirse. S3 almacena objetos y estudiaremos su uso como hosting estático."},
{type:"concept",title:"Lambda · necesitamos ejecutar lógica",text:"S3 entrega archivos, pero no es nuestra lógica de negocio. Necesitamos código que reciba datos, valide y decida qué hacer."},
{type:"concept",title:"API Gateway · necesitamos una entrada HTTP",text:"El navegador necesita una dirección HTTP a la que enviar el formulario. API Gateway será la puerta de entrada hacia Lambda."},
{type:"concept",title:"DynamoDB · necesitamos persistencia",text:"Cuando Lambda termina, sus variables no son una base de datos. Para consultar mañana una solicitud necesitamos persistirla."},
{type:"concept",title:"SNS · queremos comunicar que algo ocurrió",text:"Además de guardar, podremos publicar una notificación sin convertir a Lambda en responsable directa de todos los posibles receptores."},
{type:"flow",title:"Arquitectura funcional objetivo",items:["Usuario","S3 · web","API Gateway · HTTP","Lambda · lógica","DynamoDB · guardar","SNS · publicar"]},
{type:"grid",cards:[
{label:"S3",title:"Alojar",text:"Sirve los archivos estáticos."},{label:"API GATEWAY",title:"Recibir",text:"Expone una entrada HTTP."},
{label:"LAMBDA",title:"Procesar",text:"Ejecuta la lógica Node.js."},{label:"DYNAMODB",title:"Persistir",text:"Conserva las solicitudes."},
{label:"SNS",title:"Publicar",text:"Distribuye mensajes/notificaciones."},{label:"IAM + CLOUDWATCH",title:"Permitir + observar",text:"IAM controla acciones; CloudWatch muestra qué ocurrió."}
]},
{type:"concept",title:"Serverless NO significa «sin servidores»",text:"La infraestructura existe. El cambio está en la responsabilidad: AWS administra gran parte de la infraestructura de ejecución y nosotros nos centramos en código, eventos, permisos, configuración y datos."},
{type:"warning",title:"Que un recurso exista no significa que puedas usarlo",text:"AWS evalúa permisos. Lambda necesitará una identidad —Execution Role— para actuar sobre otros servicios. En AWS Academy trabajaremos con los roles permitidos por el Learning Lab."},
{type:"quiz",title:"Comprueba",question:"Lambda funciona pero obtiene AccessDenied al intentar usar otro servicio. ¿Qué concepto revisarías primero?",options:["CSS","IAM / permisos","GitHub Pages","HTML"],correct:1,explanation:"La existencia del recurso no concede automáticamente permiso a Lambda para operar sobre él."},
{type:"success",title:"He aprendido",text:"Puedo explicar una responsabilidad por servicio y entiendo qué significa Serverless en nuestra arquitectura."}
]};