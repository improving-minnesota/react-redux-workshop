import PersonList from '../../components/person-list';
import Person from '../../components/person';
import jake from './images/jake-partusch.jpeg';
import jeff from './images/jeff-sheets.jpeg';
import mike from './images/mike-plummer.jpeg'
import travis from './images/travis-martensen.jpeg';

## Who are these guys?

<PersonList>
  {/* <Person avatar={jake} name="Jake Partusch" twitter="JakePartusch" title="Principal Technologist" key="jake" /> */}
  <Person avatar={jeff} name="Jeff Sheets" twitter="sheetsj" title="VP Technology" key="jeff" />
  <Person avatar={mike} name="Mike Plummer" twitter="plummer_mike" title="Principal Technologist" key="mike" />
  {/* <Person avatar={travis} name="Travis Martensen" twitter="tmartensen" title="Chief Technologist" key="Travis" /> */}
</PersonList>
