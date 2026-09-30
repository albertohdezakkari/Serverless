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
["Si NO estás autenticado","Ejecuta gh auth login y sigue el asistente que aparece en la terminal."]
]},
{type:"code",label:"GIT BASH",title:"Primero comprueba tu estado",code:"gh --version\n\ngh auth status"},
{type:"steps",title:"Si gh auth status dice que NO estás autenticado",steps:[
["Inicia el asistente","Ejecuta gh auth login."],
["Cuenta","Ante What account do you want to log into? selecciona GitHub.com."],
["Protocolo Git","Ante preferred protocol for Git operations selecciona HTTPS."],
["Credenciales Git","Si pregunta Authenticate Git with your GitHub credentials? selecciona Yes."],
["Método","Selecciona Login with a web browser."],
["Código temporal","GitHub CLI mostrará un código de un solo uso. Cópialo."],
["Navegador","Pulsa Enter para abrir el navegador. Si no se abre, utiliza manualmente la dirección que muestre GitHub CLI."],
["Autoriza","Inicia sesión en GitHub si hace falta, introduce/valida el código y autoriza GitHub CLI."],
["Vuelve a Git Bash","No des por terminada la autenticación sólo porque el navegador muestre éxito."]
]},
{type:"code",label:"GIT BASH",title:"Autentica sólo si hace falta",code:"gh auth login"},
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