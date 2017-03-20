import $ from 'jquery';
import userList from './UsersList';
import managersList from './ManagersList';

var state = {
  users: [],
  managers: []
}

const onPromote = (btn) => {
  const userId = $(btn).attr('data-type');

  $.ajax({
    url:`/api/users/${userId}`,
    method: 'PUT',
    data: JSON.stringify({
      managerFlag: true
    }),
    contentType: 'application/json'
  })
  .then( manager => {
    state.managers.push(manager);
    const { users, managers } = state;
    userList('#userList', users, managers, onPromote, onDemote, onSelect);
    managersList('#managersList', users, managers);
  })
}

const onDemote = (btn) => {
  const userId = $(btn).attr('data-type');

  $.ajax({
    url:`/api/users/${userId}`,
    method: 'PUT',
    data: JSON.stringify({
      managerFlag: false
    }),
    contentType: 'application/json'
  })
  .then( manager => {
    state.managers = state.managers.filter(manager=> manager.id !== userId*1)
    const { users, managers } = state;
    userList('#userList', users, managers, onPromote, onDemote, onSelect);
    managersList('#managersList', users, managers);
  })
}

const onSelect = (option)=> {
  let managerId = $(option).find(':selected').attr('data-type') * 1;
  const parent = $(option).parents()[0]
  const sibling = $(parent).siblings()[0]
  const userId = $('button', sibling).attr('data-type') * 1;
  if(!managerId) managerId = null;

  $.ajax({
    url: `/api/users/${userId}`,
    method: 'PUT',
    data: JSON.stringify({
      managerId: managerId
    }),
    contentType: 'application/json'
  })
  .then( () => $.get('/api/users'))
  .then( users => {
    state.users = users;
    managersList('#managersList',state.users,state.managers);
  });

}

const init = () => {
  const { users, managers } = state;
  userList('#userList', users, managers, onPromote, onDemote, onSelect);
  managersList('#managersList', users, managers);
}

$.get('/api/users')
.then( users => {
  state.users = users;
})

$.get('/api/managers')
.then( managers => {
  state.managers = managers;
  init();
})
