El proyecto desarrollado se llama Kore y es una plataforma elaborada para que los interesados en el desarrollo de videojuegos tengan un espacio en donde poder publicar sus proyectos y puedan ser testeados. De esta manera van a poder recibir observaciones, dentro de la plataforma, en función de la valoración y análisis realizado por la persona que probo el proyecto. Con lo cual, los desarrolladores van a poder recibir ayuda en la detección de posibles fallas o problemas en el diseño del proyecto, y así poder realizar los arreglos y ajustes correspondientes.

Funcionalidades implementadas:
-Se pueden registrar y autenticar los usuarios.
-Se muestran todos los proyectos publicados en la plataforma.
-Se pueden filtrar por categoría todos los proyectos publicados.
-Se pueden crear, editar y eliminar proyectos.
-Se puede crear, editar y eliminar una observación en un proyecto, siempre y cuando el proyecto no haya sido publicado por el mismo usuario que trata de realizar la observación. El unico campo obligatorio para generar una observaciòn es el de "Generales". 
-Se puede acceder al perfil del usuario donde pueden visualizarse todos los proyectos y observaciones creados por este en la plataforma.

Para correr el trabajo primero es necesario instalar las dependencias correspondientes con el comando "npm i" en las carpetas "api" y "frontend", que están dentro de "Kore". Luego para proceder a la ejecución del trabajo se debe utilizar el comando "npm start" en la carpeta "api" y el comando "npm run dev" en la carpeta "frontend". Al iniciar el proyecto se debe registrar un usuario para poder ingresar a la plataforma y así acceder al resto de las funcionalidades. Esto se debe a que la base de datos no viene con valores cargados por defecto cada vez que se inicia el trabajo en una nueva máquina.
ACLARACION 1: debido a un error en el consumo de los datos desde frontend a api es necesario refrescar el navegador cada vez que se ingresa a la plataforma con un usario para poder realizar todas las funcionalidades. 
ACLARACION 2: si se está tratando de iniciar el proyecto en una de las computadoras de Da Vinci recodar ejecutar el comando "mongod" en el "cmd". 