window.lesson02={
id:"s3",title:"Publica el Ebook con Amazon S3",navTitle:"02 · Amazon S3",
hero:{eyebrow:"BLOQUE 02 · AMAZON S3",title:"De una web comprobada a un sitio alojado en AWS",description:"Verificamos primero el frontend con GitHub Pages y después creamos, llenamos y configuramos S3 desde AWS CLI.",chips:["GitHub Pages","S3","AWS CLI","Bucket","Objetos","Website hosting"]},
sections:[
{type:"concept",title:"Primero demostramos que el frontend funciona",text:"La web local se versiona en GitHub y puede publicarse con GitHub Pages. Así separamos dos problemas: frontend correcto y hosting AWS."},
{type:"flow",title:"Recorrido del bloque",items:["Web local","GitHub","GitHub Pages ✓","AWS Academy","AWS CLI","S3","Website endpoint"]},
{type:"concept",title:"CONCEPTO NUEVO · Bucket y objeto",text:"Un bucket es un contenedor lógico de S3. index.html, CSS, JavaScript e imágenes son objetos. El nombre del bucket debe ser válido y globalmente único."},
{type:"warning",title:"Antes de S3: verifica Academy",text:"Ejecuta aws sts get-caller-identity. Si falla, renueva las credenciales. Una sesión caducada no es un error de S3."},
{type:"code",label:"GIT BASH",title:"Identidad y región",code:"aws sts get-caller-identity\naws configure get region"},
{type:"steps",title:"1 · Crea el bucket con AWS CLI",steps:[["Nombre","Elige un nombre único y reconocible."],["Crea","Ejecuta create-bucket con la región real del Learning Lab."],["Verifica","Ejecuta aws s3 ls. No des por creado un recurso sin comprobarlo."]]},
{type:"code",label:"MODELO · ADAPTA REGIÓN",title:"Creación",code:"aws s3api create-bucket --bucket NOMBRE-UNICO --region TU-REGION\n\naws s3 ls"},
{type:"warning",title:"La región importa",text:"Según la región, create-bucket puede requerir LocationConstraint. No copies una región de ejemplo: utiliza la del Learning Lab."},
{type:"concept",title:"2 · Bucket creado ≠ bucket con contenido",text:"Ahora sincronizamos nuestra carpeta web. aws s3 sync compara origen y destino y sube lo necesario."},
{type:"code",label:"DESDE LA RAÍZ DEL PROYECTO",title:"Sincroniza la web",code:"aws s3 sync ./web s3://NOMBRE-BUCKET\n\naws s3 ls s3://NOMBRE-BUCKET"},
{type:"concept",title:"3 · Archivos en S3 ≠ website configurado",text:"Website hosting es otra configuración. Debemos indicar al menos qué documento funciona como índice."},
{type:"code",label:"AWS CLI",title:"Configura el website",code:"aws s3 website s3://NOMBRE-BUCKET/ \\\n  --index-document index.html \\\n  --error-document error.html"},
{type:"warning",title:"4 · Acceso público: punto sensible",text:"El website clásico de S3 necesita lectura pública de los objetos. S3 bloquea acceso público por defecto. AWS recomienda mantener ese bloqueo y, en producción, usar arquitecturas más seguras. En Academy sólo realizaremos las operaciones permitidas por el laboratorio; no intentaremos saltarnos restricciones IAM."},
{type:"concept",title:"Qué estamos aprendiendo realmente",text:"Almacenamiento, website configuration y permisos son tres responsabilidades diferentes. Que una funcione no demuestra las otras."},
{type:"checklist",title:"Checkpoint S3",items:["Academy está activo.","El bucket existe.","Los objetos están subidos.","index.html está presente.","Website hosting está configurado si Academy lo permite.","He comprobado el resultado.","Puedo explicar bucket, objeto, website y permisos."]},
{type:"quiz",title:"Comprueba",question:"Has subido index.html, pero la web no es accesible como sitio. ¿Qué conclusión es correcta?",options:["S3 está roto.","Subir objetos y configurar website/permisos son pasos diferentes.","Necesitamos DynamoDB.","Falta instalar Node.js."],correct:1,explanation:"Tener objetos almacenados no configura automáticamente website hosting ni acceso de lectura."},
{type:"success",title:"He aprendido",text:"Sé crear y verificar un bucket, sincronizar contenido y distinguir almacenamiento, website configuration y permisos."}
]};