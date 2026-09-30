window.lesson00={
id:"preparacion",title:"Prepara tu laboratorio Windows",navTitle:"00 · Preparación",
hero:{eyebrow:"BLOQUE 00 · WINDOWS DESDE CERO",title:"Del ordenador del aula al laboratorio AWS",description:"Instala y verifica cada herramienta antes de crear recursos. Nuestra terminal principal será Git Bash.",chips:["Windows","Git Bash","GitHub CLI","Node.js","AWS CLI v2","Terraform","AWS Academy"]},
sections:[
{type:"concept",title:"Regla: instalar → comprobar → continuar",text:"No avanzamos porque un instalador haya terminado. Cada herramienta debe responder desde la terminal que utilizaremos en clase."},
{type:"steps",title:"1 · Git for Windows + Git Bash",steps:[["Instala","Instala Git for Windows y conserva Git Bash como terminal de trabajo."],["Reabre","Cierra las terminales abiertas para actualizar PATH."],["Verifica","Abre Git Bash y ejecuta git --version."]]},
{type:"code",label:"GIT BASH",title:"Verifica Git",code:"git --version"},
{type:"steps",title:"2 · GitHub CLI",steps:[["Instala","Instala GitHub CLI para Windows."],["Comprueba","Ejecuta gh --version."],["Autentica","Ejecuta gh auth login → GitHub.com → HTTPS."],["Confirma","Ejecuta gh auth status. Debe indicar que tu cuenta está autenticada."]]},
{type:"code",label:"GIT BASH",title:"GitHub CLI",code:"gh --version\ngh auth login\ngh auth status"},
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