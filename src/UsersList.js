import $ from 'jquery';

const userList = (containerId, users, managers, onPromote, onDemote, onSelect) => {

  const container = $(containerId);
  container.empty();
  let div;
  let options = [];

  // const options = managers.map( manager => {
  //   return `<option value="${manager.id}" data-type="${manager.id}">${manager.name}</option>`
  // })

  users.forEach( user => {

    managers.forEach( manager => {
      if (user.managerId === manager.id){
        options.push(`<option value="${manager.id}" data-type="${manager.id}" selected>${manager.name}</option>`)
      }else{
        options.push(`<option value="${manager.id}" data-type="${manager.id}">${manager.name}</option>`)
      }
    })

    const select = `<select class="form-control"><option>None</option>${ options }</select>`;

    let button = `<button data-type="${user.id}" class="btn btn-primary">Promote To Manager</button></div>`;
    let func = onPromote;

    if (managers.filter(manager => manager.id === user.id).length){
      button = `<button data-type="${user.id}" class="btn btn-danger">Demote from Manager</button></div>`;
      func = onDemote;
    }

    div = $(`<div class="panel panel-default"><div class="panel-heading">${user.name}</div><div class="panel-body"><div class="form-group">${button}<form-group><label>Managed by</label>${select}</form-group></div></div>`);

    container.append(div);

    div.on('click', 'button', function(){
      func(this);
    })

    div.on('change', 'select', function(){
      onSelect(this);
    })
    options = [];
  })

}

export default userList;

