

const getMenu = ( role = 'USER_ROLE' ) => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'ProgressBar', url: 'progress' },
            { titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'Promises', url: 'promises' },
            { titulo: 'Rxjs', url: 'rxjs' },
          ]
        },
        {
          titulo: 'Mantenedores',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            // { titulo: 'Usuarios', url: 'users' },
            { titulo: 'Hospitals', url: 'hospitals' },
            { titulo: 'Doctores', url: 'doctors' },
    
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'users' })
      }

      return menu
}

module.exports = {
    getMenu
}