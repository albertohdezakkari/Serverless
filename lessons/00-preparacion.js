window.lesson00={
id:"preparacion",title:"Prepara tu laboratorio Windows",navTitle:"00 · Preparación",
hero:{eyebrow:"BLOQUE 00 · WINDOWS DESDE CERO",title:"Del ordenador del aula al laboratorio AWS",description:"Instala y verifica cada herramienta antes de crear recursos. Nuestra terminal principal será Git Bash.",chips:["Windows","Git Bash","GitHub CLI","Node.js","AWS CLI v2","Terraform","AWS Academy"]},
sections:[
{type:"concept",title:"Regla: instalar → comprobar → continuar",text:"No avanzamos porque un instalador haya terminado. Cada herramienta debe responder desde la terminal que utilizaremos en clase."},
{type:"steps",title:"1 · Git for Windows + Git Bash",steps:[["Instala","Instala Git for Windows y conserva Git Bash como terminal de trabajo."],["Reabre","Cierra las terminales abiertas para actualizar PATH."],["Verifica","Abre Git Bash y ejecuta git --version."]]},
{type:"code",label:"GIT BASH",title:"Verifica Git",code:"git --version"},
{type:"steps",title:"2 · GitHub CLI · comprueba antes de autenticar",steps:[
["Instala","Instala GitHub CLI para Windows y vuelve a abrir Git Bash."],
["Comprueba la instalación","Ejecuta gh --version. Si muestra una versión, continúa. Si Git Bash responde command not found, cierra y vuelve a abrir la terminal; si persiste, revisa la instalación/PATH antes de seguir."],
["Comprueba la sesión","Ejecuta gh auth status. Si indica que ya estás autenticado en github.com con tu cuenta correcta, NO necesitas volver a ejecutar login."],
["Si NO estás autenticado","Ejecuta gh auth login. NO tienes que adivinar las opciones: justo debajo tienes el recorrido completo, pantalla por pantalla, con lo que debes seleccionar y por qué."]
]},
{type:"code",label:"GIT BASH",title:"Primero comprueba tu estado",code:"gh --version\n\ngh auth status"},
{type:"concept",title:"Antes de empezar · qué va a ocurrir",text:"gh auth login abre un asistente interactivo dentro de Git Bash. No escribas las respuestas de memoria: lee cada pregunta y utiliza esta guía para saber qué seleccionar y qué significa."},\n{type:"steps",title:"Si gh auth status dice que NO estás autenticado",steps:[
["Inicia el asistente","Ejecuta gh auth login."],
["Pregunta 1 · Cuenta","Verás: What account do you want to log into? Muévete con ↑/↓ si hace falta, deja seleccionado GitHub.com y pulsa Enter. Elegimos GitHub.com porque nuestros repositorios están alojados allí, no en un GitHub Enterprise Server."],
["Pregunta 2 · Protocolo Git","Verás: What is your preferred protocol for Git operations? Selecciona HTTPS y pulsa Enter. Así GitHub CLI podrá configurar un flujo sencillo de autenticación para las operaciones Git del aula."],
["Pregunta 3 · Credenciales Git","Si aparece: Authenticate Git with your GitHub credentials? selecciona Yes y pulsa Enter. Queremos que la autenticación que estamos realizando pueda utilizarse también cuando trabajemos con Git contra GitHub."],
["Pregunta 4 · Método de autenticación","Verás una pregunta similar a How would you like to authenticate GitHub CLI? Selecciona Login with a web browser. No necesitas crear ni pegar manualmente un token para este procedimiento."],
["Código temporal","Git Bash mostrará un mensaje parecido a First copy your one-time code: XXXX-XXXX. Copia ese código. Es temporal y sirve para relacionar el navegador con el login que acabas de iniciar en la terminal."],
["Abre el navegador","Git Bash indicará Press Enter to open ... in your browser. Pulsa Enter. Si el navegador no se abre automáticamente, NO reinicies el proceso: copia la dirección que muestra la terminal y ábrela manualmente."],
["Autoriza en GitHub","Si GitHub te pide iniciar sesión, utiliza la cuenta con la que trabajarás en clase. Introduce o confirma el código temporal cuando lo solicite y acepta Authorize GitHub / Authorize GitHub CLI."],
["Vuelve a Git Bash","Cuando el navegador confirme la autorización, vuelve a Git Bash. La terminal debería terminar el proceso y mostrar un mensaje de autenticación correcta. Todavía falta nuestra comprobación final con gh auth status."]
]},
{type:"code",label:"GIT BASH · INICIA EL ASISTENTE",title:"Autentica sólo si hace falta",code:"gh auth login"},\n{type:"flow",title:"Mapa rápido del asistente",items:["gh auth login","GitHub.com","HTTPS","Yes · credenciales Git","Login with a web browser","Copia XXXX-XXXX","Autoriza en navegador","Vuelve a Git Bash","gh auth status ✓"]},
{type:"steps",title:"Verificación y recuperación",steps:[
["Verifica","Ejecuta de nuevo gh auth status."],
["Si funciona","Debe indicar que estás autenticado en github.com. Comprueba también que el usuario mostrado es tu cuenta correcta y continúa con Node.js."],
["Si sigue sin autenticar","Repite gh auth login y revisa que hayas completado la autorización del navegador. No continúes con GitHub hasta resolverlo."],
["Si aparece otra cuenta","No trabajes con una identidad equivocada. Cierra/corrige esa sesión y autentica la cuenta que utilizarás en clase."]
]},
{type:"code",label:"STOP · RESULTADO ESPERADO",title:"Confirma la autenticación",code:"gh auth status"},
{type:"checklist",title:"STOP · GitHub CLI preparado",items:["gh --version responde.","gh auth status reconoce github.com.","Estoy autenticado con la cuenta correcta.","Sé qué hacer si no estoy autenticado.","Sé qué revisar si Git Bash no reconoce gh."]},
{type:"steps",title:"3 · Node.js + npm",steps:[["Instala","Instala una versión LTS de Node.js para Windows."],["Reabre Git Bash","Una terminal antigua puede no conocer el nuevo PATH."],["Comprueba","node --version y npm --version deben responder."]]},
{type:"code",label:"GIT BASH",title:"Node.js",code:"node --version\nnpm --version"},
{type:"steps",title:"4 · AWS CLI v2",steps:[["Instala","Instala AWS CLI v2 para Windows."],["Comprueba","Ejecuta aws --version."],["Distingue","AWS CLI instalada no significa que estés autenticado en AWS."]]},
{type:"code",label:"GIT BASH",title:"AWS CLI",code:"aws --version"},
{type:"steps",title:"5 · Terraform",steps:[["Instala","Instala Terraform y deja terraform.exe accesible mediante PATH."],["Comprueba","Ejecuta terraform --version."],["Espera","Todavía no desplegamos. Terraform tendrá sentido cuando ya conozcas la infraestructura."]]},
{type:"code",label:"GIT BASH",title:"Terraform",code:"terraform --version"},
{type:"concept",title:"6 · AWS Academy Learning Lab",text:"Entra en AWS Academy → Learning Lab → Start Lab. Trabajaremos siempre dentro de este laboratorio, no con una cuenta AWS personal."},
{type:"steps",title:"7 · Credenciales temporales",steps:[["Obtén","Copia Access Key, Secret Access Key y Session Token actuales del Learning Lab."],["Prepara","Desde Git Bash crea ~/.aws si hace falta y abre ~/.aws/credentials."],["Configura","Usaremos inicialmente el perfil [default]."],["Guarda con nano","Ctrl+O → Enter → Ctrl+X."]]},
{type:"code",label:"GIT BASH",title:"Configura ~/.aws/credentials",code:"mkdir -p ~/.aws\nnano ~/.aws/credentials\n\n[default]\naws_access_key_id=...\naws_secret_access_key=...\naws_session_token=..."},
{type:"warning",title:"Credenciales = secreto",text:"Nunca publiques Access Key, Secret Access Key ni Session Token en GitHub, código, Terraform o README."},
{type:"code",label:"PRUEBA DEFINITIVA",title:"Verifica la identidad real",code:"aws sts get-caller-identity"},
{type:"concept",title:"Interpreta la respuesta",text:"Account identifica la cuenta del laboratorio y Arn/UserId la identidad temporal. Si falla, revisa Academy antes de investigar cualquier servicio AWS."},
{type:"checklist",title:"STOP · Laboratorio preparado",items:["Git funciona.","GitHub CLI está autenticado.","Node.js y npm responden.","AWS CLI responde.","Terraform responde.","Learning Lab está activo.","aws sts get-caller-identity devuelve identidad."]},
{type:"success",title:"He aprendido",text:"Sé preparar un Windows desde cero y diferenciar instalación, autenticación y verificación."}
]};