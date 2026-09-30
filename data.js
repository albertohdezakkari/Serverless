const lessons = [
  {
    id:"inicio", number:"00", title:"Inicio · Ruta Serverless", navTitle:"00 · Inicio",
    hero:{eyebrow:"CUADERNO DE APRENDIZAJE · AWS",title:"De una web estática a una arquitectura Serverless",description:"Aprenderás a construir, observar, diagnosticar y reproducir una aplicación serverless real trabajando siempre con AWS Academy Learning Lab, Node.js, AWS CLI y Terraform.",chips:["AWS Academy","Node.js","AWS CLI","Terraform","GitHub","10 bloques"]},
    sections:[
      {type:"grid",cards:[
        {label:"QUÉ VAS A CONSTRUIR",title:"Ebook Serverless",text:"Una web estática evolucionará hasta comunicarse con API Gateway, Lambda, DynamoDB y SNS."},
        {label:"CÓMO VAS A TRABAJAR",title:"Comprende → construye → prueba",text:"Cada concepto aparece antes de utilizarse. Las piezas se prueban aisladamente antes de integrarlas."},
        {label:"ENTORNO",title:"Windows + Git Bash",text:"Los equipos del aula se preparan desde cero. Instalaremos Git, Node.js, AWS CLI y Terraform."},
        {label:"RESTRICCIÓN REAL",title:"AWS Academy",text:"Todos los permisos, roles y credenciales se trabajan dentro de Learning Lab. No asumimos una cuenta administrativa."}
      ]},
      {type:"flow",title:"Mapa de aprendizaje",items:["Web local","GitHub Pages","Amazon S3","Lambda","API Gateway","DynamoDB","SNS","Troubleshooting","Terraform","Challenge"]},
      {type:"success",title:"Objetivo final",text:"Al terminar, podrás explicar la arquitectura completa, desplegarla, diagnosticarla y reconstruirla como Infrastructure as Code."}
    ]
  },
  {
    id:"preparacion", number:"00A", title:"Prepara tu laboratorio Windows", navTitle:"00A · Preparación",
    hero:{eyebrow:"PREPARACIÓN · WINDOWS",title:"Del equipo limpio al laboratorio AWS",description:"Instala y verifica las herramientas necesarias antes de crear el primer recurso AWS.",chips:["Windows","Git Bash","GitHub CLI","Node.js","AWS CLI","Terraform"]},
    sections:[
      {type:"concept",title:"Regla del laboratorio",text:"No continuamos hasta verificar cada herramienta. Instalar no es lo mismo que comprobar que funciona."},
      {type:"code",label:"DIAGNÓSTICO FINAL",title:"Todos estos comandos deben responder",code:"git --version\ngh --version\nnode --version\nnpm --version\naws --version\nterraform --version\naws sts get-caller-identity"},
      {type:"warning",title:"AWS Academy usa credenciales temporales",text:"AWS CLI puede seguir instalada y dejar de funcionar porque la sesión del Learning Lab haya caducado. Ante un error de autenticación, comprueba primero aws sts get-caller-identity."}
    ]
  },
  {
    id:"arquitectura", number:"01", title:"Descubre la arquitectura Serverless", navTitle:"01 · Arquitectura",
    hero:{eyebrow:"BLOQUE 01 · MODELO MENTAL",title:"¿Qué necesita realmente nuestra web?",description:"Antes de crear servicios, entenderás qué problema resuelve cada pieza de la arquitectura.",chips:["Serverless","S3","API Gateway","Lambda","DynamoDB","SNS"]},
    sections:[
      {type:"concept",title:"Serverless no significa «sin servidores»",text:"La infraestructura física existe. La diferencia es que no administramos directamente los servidores que ejecutan estas piezas; AWS abstrae gran parte de esa operación."},
      {type:"flow",title:"Arquitectura objetivo",items:["Usuario","S3 · web","API Gateway · HTTP","Lambda · lógica","DynamoDB · persistencia","SNS · notificación"]},
      {type:"grid",cards:[
        {label:"S3",title:"Alojar",text:"Entrega HTML, CSS, JavaScript e imágenes."},
        {label:"API GATEWAY",title:"Recibir",text:"Expone una entrada HTTP hacia nuestro backend."},
        {label:"LAMBDA",title:"Procesar",text:"Ejecuta la lógica de negocio con Node.js."},
        {label:"DYNAMODB",title:"Persistir",text:"Conserva las solicitudes después de que Lambda termine."},
        {label:"SNS",title:"Publicar",text:"Comunica que ha ocurrido una nueva solicitud."},
        {label:"IAM + CLOUDWATCH",title:"Permitir y observar",text:"IAM controla acciones; CloudWatch permite diagnosticar ejecuciones."}
      ]}
    ]
  },
  {
    id:"lambda", number:"03", title:"Mi primera Lambda Serverless", navTitle:"03 · Primera Lambda",
    hero:{eyebrow:"BLOQUE 03 · AWS LAMBDA",title:"Ejecuta código sin administrar servidores",description:"Crearás por primera vez una función Lambda desde AWS Academy, con Node.js, Test Events, Execution Role y CloudWatch.",chips:["AWS Academy","Lambda","Node.js","event","handler","CloudWatch"]},
    sections:[
      {type:"concept",title:"¿Qué problema resuelve Lambda?",text:"Necesitamos ejecutar lógica cuando ocurre algo —por ejemplo, una petición HTTP— sin mantener un servidor Node.js permanentemente administrado por nosotros."},
      {type:"flow",title:"Modelo mental",items:["Evento","Lambda","handler(event)","Node.js","Respuesta"]},
      {type:"warning",title:"AWS Academy: Execution Role",text:"La función se ejecuta con una identidad. No daremos por hecho que podemos crear roles administrativos: utilizaremos el role permitido por Learning Lab y verificaremos cada permiso."},
      {type:"code",label:"OBSERVA · index.mjs",title:"Primera función",code:"export const handler = async (event) => {\\n  console.log('Evento recibido:', event);\\n\\n  const nombre = event.nombre ?? 'usuario';\\n\\n  return {\\n    statusCode: 200,\\n    body: JSON.stringify({\\n      message: 'Hola ' + nombre + '. Tu Lambda funciona.'\\n    })\\n  };\\n};"},
      {type:"concept",title:"Editar ≠ Deploy ≠ Test",text:"Editar cambia el contenido del editor. Deploy publica esa versión de la función. Test provoca una invocación. Son tres acciones diferentes."},
      {type:"checklist",title:"Checkpoint",items:["He creado ebook-contact desde AWS Academy.","He seleccionado Node.js como runtime.","He identificado el Execution Role.","He realizado Deploy antes de Test.","Mi evento de prueba llega mediante event.","Puedo localizar console.log() en CloudWatch."]},
      {type:"quiz",title:"Comprueba",question:"¿Qué representa event dentro del handler?",options:["El servidor físico de Lambda.","La información recibida durante una invocación.","El Execution Role.","El archivo index.mjs."],correct:1,explanation:"event contiene la información que AWS entrega a la función en esa invocación."},
      {type:"success",title:"He aprendido",text:"Qué significa serverless, qué es una invocación, qué papel tienen handler y event, por qué Lambda necesita un Execution Role y dónde observar sus logs."}
    ]
  },
  {
    id:"challenge", number:"10", title:"Serverless Challenge · Tech Event", navTitle:"10 · Challenge",
    hero:{eyebrow:"BLOQUE 10 · EVALUABLE",title:"Transfiere lo aprendido a un problema nuevo",description:"Dispones de 5 horas para construir una aplicación serverless de inscripción a un evento tecnológico. No tendrás la solución completa.",chips:["5 horas","100 puntos","Terraform","Node.js","AWS Academy"]},
    sections:[
      {type:"warning",title:"Aquí cambia el modo de trabajo",text:"No hay OBSERVA con solución completa. Debes analizar, diseñar, construir, desplegar, probar, diagnosticar y justificar."},
      {type:"grid",cards:[
        {label:"FORMULARIO",title:"5 campos",text:"name, email, event, modality y observations."},
        {label:"BACKEND",title:"Completa los datos",text:"Genera id y createdAt, valida y responde al frontend."},
        {label:"RESULTADO",title:"Dos efectos",text:"Cada inscripción válida debe persistirse y publicar una notificación."},
        {label:"INFRAESTRUCTURA",title:"Terraform obligatorio",text:"La infraestructura debe ser reproducible dentro de AWS Academy."}
      ]},
      {type:"flow",title:"Tu proceso",items:["Analiza","Diseña","Prepara Academy","Terraform","Implementa Node.js","Prueba backend","Conecta frontend","E2E","Diagnostica","Entrega"]},
      {type:"table",title:"Criterios de evaluación",headers:["Área","Puntos"],rows:[["Análisis y arquitectura","15"],["Infrastructure as Code · Terraform","25"],["Lambda Node.js y lógica","15"],["Persistencia y mensajería","15"],["Integración End-to-End","15"],["Observabilidad y diagnóstico","5"],["GitHub, documentación y entrega","10"]]}
    ]
  }
];