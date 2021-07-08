import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { Button } from 'baseui/button';
import Filter from 'baseui/icon/filter';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Tabs, Tab } from 'baseui/tabs';

function AdminSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(getUsers());
  const [admins, setAdmins] = useState(getAdmins());
  const [activeKey, setActiveKey] = useState('0');
  const [css] = useStyletron();

  function makeAdmin(user) {
    setUsers(users.filter(item => item !== user));
    setAdmins(admins.concat([user]));
  }
  return (
    <>
      {/* <span className = "icons"><Show /></span> */}
      <div
        className="flex cursor-pointer items-center pl-1 truncate font-normal"
        onClick={() => setIsOpen(true)}>
        <Filter />
        {/* <GrUserManager style={{color: "white", borderColor: "white", stroke:"white"}}/>  */}
        &nbsp; Admin Console
      </div>

      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        animate
        autoFocus
        overrides={{
          Dialog: {
            style: {
              height: 'max-content',
              width: '40%',
              minWidth: '500px',
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
        <ModalHeader>Admin Console</ModalHeader>
        <ModalBody>
          <Tabs
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
            activeKey={activeKey}
            overrides={{
              TabBar: {
                style: () => ({
                  outline: '#fff solid',
                  backgroundColor: '#fff',
                }),
              },
            }}>
            <Tab title="Make Admins">
              <div className="flex">
                {/* <div style={{flex:1}}>
          ASDF
        </div>             */}
                <div></div>
                <ul
                  style={{ flex: 1 }}
                  className={css({
                    width: '60%',
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowY: 'auto',
                    maxHeight: '60vh',
                    marginRight: 0,
                  })}>
                  {users.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemLabel>{item}</ListItemLabel>
                      <Button kind="secondary" onClick={() => makeAdmin(item)}>
                        Make Admin
                      </Button>
                    </ListItem>
                  ))}
                </ul>
              </div>
            </Tab>
            <Tab title="View Admins">
              <div className="flex">
                <ul
                  style={{ flex: 1 }}
                  className={css({
                    width: '60%',
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowY: 'auto',
                    maxHeight: '60vh',
                    marginRight: 0,
                  })}>
                  {admins.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemLabel>{item}</ListItemLabel>
                    </ListItem>
                  ))}
                </ul>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </Modal>
    </>
  );
}

function getAdmins() {
  return ['Ray.Sin@sprinklr.com', 'Isabelle.Ringing@sprinklr.com'];
}

function getUsers() {
  return [
    'Eileen.Sideways@sprinklr.com',
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

export default AdminSettings;
