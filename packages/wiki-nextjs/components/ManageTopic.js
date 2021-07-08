import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { ListItemLabel } from 'baseui/list';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { BiChevronDown } from 'react-icons/bi';
import { Tabs, Tab } from 'baseui/tabs';

function AccessLevel(props) {
  const currentAccess = props.currentAccess;
  const removeOption = currentAccess !== 'View';

  function ChangeAccess(newAccess) {
    props.closePopover();
    if (currentAccess !== newAccess)
      props.onAccessChange(newAccess, props.userId);
  }

  return (
    <div className="py-1.5 w-40" style={{ fontSize: '14px' }}>
      <div
        className="cursor-pointer  px-2 py-1 text-gray-800 hover:bg-gray-100"
        onClick={() => ChangeAccess('Manager')}>
        Manager
      </div>
      <div
        className="cursor-pointer  px-2 py-1 text-gray-800 hover:bg-gray-100"
        onClick={() => ChangeAccess('Member')}>
        Member
      </div>
      {removeOption && (
        <div
          className="cursor-pointer px-2 py-1 text-red-600 hover:bg-gray-100"
          onClick={() => ChangeAccess('remove')}>
          Remove from Topic
        </div>
      )}
    </div>
  );
}

function UserRow(props) {
  const userId = props.userId;
  const email = props.email;
  const name = props.name;
  const access = props.access;
  const handleAccessChange = props.handleAccessChange;
  return (
    <div className="flex justify-between border-b pl-2 pr-5 py-1.5 border-opacity-70">
      <ListItemLabel
        key={userId}
        description={email}
        overrides={{
          LabelContent: {
            style: () => ({ color: '#374151', fontSize: '15px' }),
          },
          LabelDescription: {
            style: () => ({ color: '#4B5563', fontSize: '14px' }),
          },
        }}>
        {name}
      </ListItemLabel>

      <StatefulPopover
        content={({ close }) => (
          <AccessLevel
            onAccessChange={handleAccessChange}
            currentAccess={access}
            userId={userId}
            closePopover={close}
          />
        )}
        placement={PLACEMENT.bottom}
        returnFocus
        autoFocus
        overrides={{
          Body: {
            style: () => ({
              borderBottomLeftRadius: '3px',
              borderBottomRightRadius: '3px',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px',
            }),
          },
          Inner: {
            style: () => ({
              backgroundColor: 'white',
              borderBottomLeftRadius: '3px',
              borderBottomRightRadius: '3px',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px',
            }),
          },
        }}>
        <div
          className="flex w-24 my-auto rounded py-1 px-2.5 cursor-pointer hover:bg-gray-100"
          style={{ fontSize: '15px' }}>
          {access}{' '}
          <span className="my-auto text-lg">
            <BiChevronDown />
          </span>
        </div>
      </StatefulPopover>
    </div>
  );
}

function ManageTopic() {
  const users = getUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [managers, setManagers] = useState(getTopicPermissions().manager);
  const [members, setMembers] = useState(getTopicPermissions().member);
  const userIds = Object.keys(users);
  const filterUser = userIds.filter(
    userId => (managers.includes(userId) || members.includes(userId)) === false,
  );
  const [nonMembers, setNonMembers] = useState(filterUser);
  const [activeKey, setActiveKey] = React.useState('0');

  function handleAccessChange(newAccess, userId) {
    switch (newAccess) {
      case 'Manager':
        setManagers(managers.concat([userId]));
        setMembers(members.filter(member => member !== userId));
        setNonMembers(nonMembers.filter(user => user !== userId));
        break;
      case 'Member':
        setMembers(members.concat([userId]));
        setManagers(managers.filter(manager => manager !== userId));
        setNonMembers(nonMembers.filter(user => user !== userId));
        break;
      case 'remove':
        setNonMembers(nonMembers.concat([userId]));
        setMembers(members.filter(member => member !== userId));
        setManagers(managers.filter(manager => manager !== userId));
        break;
    }
  }

  const Managers = managers.map(manager => {
    return (
      <UserRow
        key={manager}
        userId={manager}
        name={users[manager].name}
        email={users[manager].email}
        access={'Manager'}
        handleAccessChange={handleAccessChange}
      />
    );
  });

  const Members = members.map(member => {
    return (
      <UserRow
        key={member}
        userId={member}
        name={users[member].name}
        email={users[member].email}
        access={'Member'}
        handleAccessChange={handleAccessChange}
      />
    );
  });

  const NonMembers = nonMembers.map(userId => {
    return (
      <UserRow
        key={userId}
        userId={userId}
        name={users[userId].name}
        email={users[userId].email}
        access={'View'}
        handleAccessChange={handleAccessChange}
      />
    );
  });

  return (
    <>
      <div
        className="ml-auto mr-4 border rounded border-opacity-30 cursor-pointer text-white text-sm hover:bg-blue-600 px-1.5 py-0.5 transition duration-300 ease-in-out"
        onClick={() => setIsOpen(true)}>
        Manage Access
      </div>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        animate
        focusLock={false}
        overrides={{
          Dialog: {
            style: {
              height: 'max-content',
              width: '550px',
              paddingBottom: '10px',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
            },
          },
          DialogContainer: {
            style: {
              alignItems: 'initial',
              position: 'fixed',
              marginTop: '7vh',
            },
          },
        }}>
        <ModalHeader>Manage Access</ModalHeader>
        <ModalBody>
          <Tabs
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
            activeKey={activeKey}
            overrides={{
              Tab: {
                style: () => ({
                  paddingTop: '2px',
                  paddingBottom: '3px',
                }),
              },
              TabBar: {
                style: () => ({
                  outline: '#fff solid',
                  backgroundColor: '#fff',
                  paddingLeft: '0px',
                }),
              },
              TabContent: {
                style: () => ({
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }),
              },
            }}>
            <Tab title="Members">
              <div
                style={{ maxHeight: '33vh' }}
                className="flex flex-col overflow-y-auto">
                <div className="flex border-b border-t justify-between py-2 pl-2 pr-8 text-sm text-gray-500 flex-none sticky top-0 bg-white opacity-100">
                  <span>User</span>
                  <span>Access Level</span>
                </div>
                {Managers}
                {Members}
              </div>
            </Tab>
            <Tab title="All Users">
              <div
                style={{ maxHeight: '33vh' }}
                className="flex flex-col overflow-y-auto">
                <div className="flex justify-between border-b border-t py-2 pl-2 pr-10 text-sm text-gray-500 flex-none sticky top-0 bg-white opacity-100">
                  <span>User</span>
                  <span>Give Access</span>
                </div>
                {NonMembers}
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ManageTopic;

function getUsers() {
  const users = {
    id1: {
      name: 'ABC Manager',
      email: 'abc@gmail.com',
    },
    id2: {
      name: 'PQR',
      email: 'pqr@gmail.com',
    },
    id3: {
      name: 'XYZ',
      email: 'xyz@gmail.com',
    },
    id4: {
      name: 'MNO',
      email: 'mno@gmail.com',
    },
    id5: {
      name: 'GHI',
      email: 'ghi@gmail.com',
    },
    id6: {
      name: 'ABC Manager',
      email: 'abc@gmail.com',
    },
    id7: {
      name: 'A',
      email: 'pqr@gmail.com',
    },
    id8: {
      name: 'XYZ',
      email: 'xyz@gmail.com',
    },
    id9: {
      name: 'MNO',
      email: 'mno@gmail.com',
    },
    id10: {
      name: 'GHI',
      email: 'ghi@gmail.com',
    },
  };
  return users;
}

function getTopicPermissions() {
  const topicPermission = {
    manager: ['id2'],
    member: ['id1'],
  };
  return topicPermission;
}
