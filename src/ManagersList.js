import $ from 'jquery';

const managersList = (containerId,users,managers) => {
  const container = $(containerId);
  container.empty();

  managers.forEach( manager => {
    let subordinates = [];

    users.forEach( user => {
      if(user.id === manager.id){
        if(user.subordinates.length > 0){
          user.subordinates.forEach( sub => subordinates.push(sub.name))
        }
      }
    })

    subordinates = subordinates.join(', ')
    const div = `<div class="panel panel-default"><div class="panel-heading">${ manager.name }</div><div class="panel-body"><em>manages...</em><p>${subordinates}</p></div></div>`;

    container.append(div);
    subordinates = [];
  })

}

export default managersList;

