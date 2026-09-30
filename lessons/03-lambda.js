window.lesson03={
id:"lambda",title:"Mi primera función Serverless con AWS Lambda",navTitle:"03 · Primera Lambda",
hero:{eyebrow:"BLOQUE 03 · PRIMER BACKEND SERVERLESS",title:"Crea tu primera Lambda desde AWS Academy",description:"La primera vez trabajamos desde la consola y sin correr: concepto, runtime, Execution Role, código, Deploy, Test Event y CloudWatch.",chips:["Lambda","Node.js","Execution Role","event","handler","CloudWatch"]},
sections:[
{type:"concept",title:"Tenemos web, pero necesitamos backend",text:"S3 entrega el Ebook, pero no procesa el formulario. Necesitamos ejecutar código cuando se produzca una invocación."},
{type:"concept",title:"¿Qué es AWS Lambda?",text:"Lambda ejecuta código en respuesta a invocaciones o eventos sin que administremos directamente el servidor. Se utiliza en APIs, procesamiento de archivos, automatizaciones, eventos y mensajería."},
{type:"grid",cards:[
{label:"HOY",title:"Formulario Ebook",text:"Procesaremos una solicitud."},{label:"FUTURO",title:"APIs",text:"Lógica de backends serverless."},
{label:"FUTURO",title:"Eventos",text:"Reacción a servicios y eventos."},{label:"FUTURO",title:"Automatización",text:"Tareas sin mantener un servidor propio."}
]},
{type:"concept",title:"CONCEPTO NUEVO · Function e Invocation",text:"Function es el recurso/código. Invocation es cada ejecución concreta de esa función."},
{type:"concept",title:"CONCEPTO NUEVO · event y handler",text:"Lambda entrega la información de cada invocación al handler mediante event. Más adelante API Gateway generará eventos HTTP; hoy empezamos con un JSON sencillo."},
{type:"flow",title:"Modelo mental",items:["Evento JSON","Lambda","handler(event)","Node.js","Respuesta"]},
{type:"steps",title:"1 · Entra en Lambda desde AWS Academy",steps:[["Learning Lab","Comprueba que el laboratorio está iniciado."],["AWS Console","Abre la consola desde el propio Learning Lab."],["Busca Lambda","Entra en Lambda → Functions."],["Crea","Pulsa Create function / Creación de función."]]},
{type:"steps",title:"2 · Author from scratch",steps:[["Modo","Selecciona Author from scratch / Crear desde cero."],["Nombre","Function name: ebook-contact."],["Runtime","Elige Node.js 24.x si está disponible en tu consola. Node.js 22.x sigue soportado; utiliza el runtime disponible definido para la clase."],["Architecture","Mantén x86_64 para este laboratorio."]]},
{type:"warning",title:"3 · Permissions / Execution Role · NO pases de largo",text:"Lambda se ejecuta con una identidad. En una cuenta estándar la consola puede crear un role básico, pero nosotros estamos en AWS Academy. Utiliza el role permitido por el Learning Lab cuando corresponda; no intentes crear o ampliar roles administrativos si Academy no lo permite."},
{type:"concept",title:"¿Para qué sirve el Execution Role?",text:"Determina qué puede hacer la función sobre AWS. Más adelante necesitaremos operaciones como dynamodb:PutItem y sns:Publish. Los permisos de tu usuario/CLI y los de Lambda no tienen por qué ser los mismos."},
{type:"checklist",title:"STOP · Antes de programar",items:["Estoy dentro del Learning Lab correcto.","Veo la función ebook-contact.","El runtime es Node.js.","La arquitectura es x86_64.","He identificado el Execution Role utilizado."]},
{type:"concept",title:"4 · Orientación en la pantalla",text:"Code contiene el programa; Test provoca ejecuciones; Configuration contiene ajustes y permisos; Monitor permite observar métricas y acceder a logs."},
{type:"concept",title:"5 · index.mjs y el handler",text:"La consola de Node.js crea un archivo index.mjs. El handler exportado es el punto de entrada que Lambda invoca."},
{type:"code",label:"OBSERVA · index.mjs COMPLETO",title:"Nuestra primera Lambda",code:"export const handler = async (event) => {\n  console.log('Evento recibido:', event);\n\n  const nombre = event.nombre ?? 'usuario';\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      message: 'Hola ' + nombre + '. Tu Lambda funciona.'\n    })\n  };\n};"},
{type:"grid",cards:[
{label:"handler",title:"Punto de entrada",text:"Función que Lambda ejecuta."},{label:"event",title:"Datos de entrada",text:"Información recibida en la invocación."},
{label:"console.log",title:"Observabilidad",text:"Escribe información que podremos consultar en logs."},{label:"return",title:"Resultado",text:"Valor devuelto por nuestra función."}
]},
{type:"warning",title:"6 · Editar ≠ Deploy ≠ Test",text:"Editar modifica el editor. Deploy actualiza el código de la función. Test provoca una invocación. Si olvidas Deploy, puedes estar probando una versión anterior."},
{type:"steps",title:"7 · Crea tu primer Test Event",steps:[["Test","Abre la zona de eventos de prueba."],["Nombre","Guarda el evento como primer-evento."],["JSON","Utiliza un objeto sencillo con nombre."],["Predice","Antes de ejecutar, explica dónde llegará ese valor."]]},
{type:"code",label:"TEST EVENT",title:"primer-evento",code:"{\n  \"nombre\": \"María\"\n}"},
{type:"concept",title:"8 · Primera invocación",text:"Pulsa Deploy y después Test. El valor María entra por event.nombre y la función devuelve una respuesta. Has ejecutado código en AWS sin administrar directamente un servidor."},
{type:"code",label:"RESULTADO ESPERADO",title:"Respuesta",code:"{\n  \"statusCode\": 200,\n  \"body\": \"{\\\"message\\\":\\\"Hola María. Tu Lambda funciona.\\\"}\"\n}"},
{type:"concept",title:"9 · No te limites a ver verde",text:"Status indica si la invocación terminó; Response muestra lo devuelto; logs explican qué ocurrió; Duration y memoria aportan información de ejecución."},
{type:"steps",title:"10 · CloudWatch Logs",steps:[["Monitor","Entra en Monitor desde la función."],["Logs","Abre los logs asociados en CloudWatch."],["Busca","Localiza Evento recibido y tu JSON."],["Relaciona","Comprueba que ese log pertenece a la invocación que acabas de provocar."]]},
{type:"flow",title:"Dónde termina console.log()",items:["index.mjs","Lambda","console.log()","CloudWatch Logs"]},
{type:"concept",title:"RECUPERAMOS · AWS CLI",text:"La función creada desde la consola también puede observarse desde la CLI. No son dos AWS diferentes: son dos interfaces sobre el mismo recurso."},
{type:"code",label:"GIT BASH",title:"Comprueba la función",code:"aws lambda list-functions"},
{type:"warning",title:"Diagnóstico Academy",text:"Si ayer funcionaba y hoy AWS CLI o una operación falla, comprueba primero aws sts get-caller-identity. Las credenciales de Learning Lab son temporales."},
{type:"checklist",title:"Checkpoint Lambda",items:["He creado ebook-contact.","Entiendo Function e Invocation.","Sé qué son handler y event.","He identificado el Execution Role.","He realizado Deploy antes de Test.","Mi evento devuelve Hola María.","He localizado console.log en CloudWatch.","aws lambda list-functions muestra la función.","Puedo explicar la ejecución sin mirar el código."]},
{type:"quiz",title:"Comprueba",question:"Has cambiado index.mjs, pero Test sigue mostrando el comportamiento anterior. ¿Qué comprobarías primero?",options:["DynamoDB","Que hayas pulsado Deploy","S3","Terraform"],correct:1,explanation:"El editor puede contener cambios que todavía no han sido desplegados a la función."},
{type:"success",title:"He aprendido",text:"Qué significa Serverless en Lambda, qué son Function, Invocation, handler y event, cómo interviene el Execution Role y cómo observar una ejecución en CloudWatch."}
]};