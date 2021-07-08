import React, {useState} from 'react';
import { Button, SIZE } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import {ListItem, ListItemLabel} from 'baseui/list';
import Plus from 'baseui/icon/plus';
import { BiChevronDown } from 'react-icons/bi';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';

const AccessLevel = (props) => {

  const ChangeAccess = (newAccessType) =>{
    props.closePopover();
    if(props.currentAccess!==newAccessType){
      props.handleAccessChange(newAccessType, props.userId);
    }
  }

  return (
    <>
      <div className="py-1.5 w-40" style={{ fontSize: '14px' }}>
        <div
          className="cursor-pointer  px-2 py-1 text-gray-800 hover:bg-gray-100"
          onClick={() => ChangeAccess('Manager', props.userId)}>
          Manager
        </div>
        <div
          className="cursor-pointer  px-2 py-1 text-gray-800 hover:bg-gray-100"
          onClick={() => ChangeAccess('Member', props.userId)}>
          Member
        </div>
        {props.currentAccess !== 'View' && (
          <div
            className="cursor-pointer px-2 py-1 text-red-600 hover:bg-gray-100"
            onClick={() => ChangeAccess('remove', props.userId)}>
            Remove from Topic
          </div>
        )}
      </div>
    </>
  )
}

const UserRow = (props) => {
  return (
    <>
      <div className="flex justify-between border-b pl-2 pr-5 py-1.5 border-opacity-70">
        <div style={{minWidth:'250px'}}>
        <ListItemLabel
          key={props.userId}
          overrides={{
            LabelContent: {
              style: () => ({whiteSpace: 'nowrap',overflow:'hidden',textOverflow: 'ellipsis',color: '#374151', fontSize: '15px' }),
            },
          }}>
          {props.userId}
        </ListItemLabel>
        </div>
        <div className="ml-auto">
        <StatefulPopover
          content={({ close }) => (
            <AccessLevel
              handleAccessChange={props.handleAccessChange}
              currentAccess={props.access}
              userId={props.userId}
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
            <div>{props.access}{' '}</div>
            <span className="my-auto text-lg">
              <BiChevronDown />
            </span>
          </div>
        </StatefulPopover>
        </div>
      </div>
    </>
  )
}

const CreateTopic = () =>{
  const [isOpen, setIsOpen] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [users, setUsers] = useState(getUsers());
  
  function handleAccessChange(accessType, userId){
    switch(accessType){
      case 'Manager':
        // Handle the changes for Database
      break;
      case 'Member':
        // Handle the changes for Database
      break;
      case 'View':
        // Handle the changes for Database
      break;
    }
  }

  const Users = users.map(user => {
    return(
      <UserRow
        key={user}
        userId={user}
        access={'View'}
        handleAccessChange={handleAccessChange}
      />
    );
  })

  return(
    <>
      <ThemeProvider
        theme={createTheme(lightThemePrimitives, {
          colors: {
            buttonPrimaryHover: 'transparent',
            buttonPrimaryActive: 'transparent',
          },
        })}>
        <Button
          onClick = {()=>setIsOpen(true)}
          overrides={{
            BaseButton: {
              style: () => ({
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }),
            },
          }}>
          <Plus size={24} title="" />
            <span className="p-1">New Page</span>
        </Button>
        </ThemeProvider>

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
          <ModalHeader>Create New Topic</ModalHeader>
          <ModalBody>
            <FormControl label="Topic Name :">
              <Input
                id="topicName"
                placeholder="Enter your topic name..."
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                overrides={{
                  Root: {
                    style: () => ({
                      border: '1px solid',
                      borderRadius: '2px',
                    }),
                  },
                }}
              />
            </FormControl>
            <br />
            <h1 className="text-xl font-bold">Managers And Members List</h1>
            <br />
            <div
              style={{ maxHeight: '33vh' }}
              className="flex flex-col overflow-y-auto">
              <div className="flex border-b border-t justify-between py-2 pl-2 pr-8 text-sm text-gray-500 flex-none sticky top-0 bg-white opacity-100">
                <span style={{minWidth:'250px'}}>User</span>
                <span>Access Level</span>
              </div>
              {Users}
            </div>

            <div className="mt-5 float-right">
            <ThemeProvider
                theme={createTheme(lightThemePrimitives, {
                  colors: {
                    buttonPrimaryHover: '#2563EB',
                    buttonPrimaryActive: '#2563EB',
                  },
                })}>
                <Button
                  size={SIZE.compact}
                  onClick={()=>setIsOpen(false)}
                  overrides={{
                    BaseButton: {
                      style: () => ({
                        borderRadius: '4px',
                        backgroundColor: '#3B82F6',
                      }),
                    },
                  }}>
                  Add
                </Button>
              </ThemeProvider>
              </div>
          </ModalBody>
        </Modal>
    </>
  )
}

function getUsers() {
  return [
    'Eileen.Sideways@sprinklr.comcomaaaaaaaddfdjfn eiofneinf wionfidnfkdn cm,xckejnfuebnfj kdnv ckjd viurbfiuebf',
    'Rita.Book@sprinklr.com',
    'Paige.Turner@sprinklr.com',
    'Rhoda.Report@sprinklr.com',
    'Augusta.Wind@sprinklr.com',
    'Chris.Anthemum@sprinklr.com',
    'Anne.Teak@sprinklr.com',
    'U.R..Nice@sprinklr.com',
    'Anita.Bath@sprinklr.com',
    'Harriet.Upp@sprinklr.com',
    'I.M..Tired@sprinklr.com',
    'I..Missy.Ewe@sprinklr.com',
    'Ivana.B..Withew@sprinklr.com',
    'Anita.Letterback@sprinklr.com',
    'Hope.Furaletter@sprinklr.com',
    'B..Homesoon@sprinklr.com',
    'Bea.Mine@sprinklr.com',
    'Bess.Twishes@sprinklr.com',
    'C..Yasoon@sprinklr.com',
    'Audie.Yose@sprinklr.com',
    'Dee.End@sprinklr.com',
    'Amanda.Hug@sprinklr.com',
    'Ben.Dover@sprinklr.com',
    'Eileen.Dover@sprinklr.com',
    'Willie.Makit@sprinklr.com',
    'Willie.Findit@sprinklr.com',
    'Skye.Blue@sprinklr.com',
    'Staum.Clowd@sprinklr.com',
    'Addie.Minstra@sprinklr.com',
    'Anne.Ortha@sprinklr.com',
    'Dave.Allippa@sprinklr.com',
    'Dee.Zynah@sprinklr.com',
    'Hugh.Mannerizorsa@sprinklr.com',
    'Loco.Lyzayta@sprinklr.com',
    'Manny.Jah@sprinklr.com',
    'Mark.Ateer@sprinklr.com',
    'Reeve.Ewer@sprinklr.com',
    'Tex.Ryta@sprinklr.com',
    'Theresa.Green@sprinklr.com',
    'Barry.Kade@sprinklr.com',
    'Stan.Dupp@sprinklr.com',
    'Neil.Down@sprinklr.com',
    'Con.Trariweis@sprinklr.com',
    'Don.Messwidme@sprinklr.com',
    'Al.Annon@sprinklr.com',
    'Anna.Domino@sprinklr.com',
    'Clyde.Stale@sprinklr.com',
    'Anna.Logwatch@sprinklr.com',
    'Anna.Littlical@sprinklr.com',
    'Norma.Leigh.Absent@sprinklr.com',
    'Sly.Meebuggah@sprinklr.com',
    'Saul.Goodmate@sprinklr.com',
    'Faye.Clether@sprinklr.com',
    'Sarah.Moanees@sprinklr.com',
  ];
}

export default CreateTopic;