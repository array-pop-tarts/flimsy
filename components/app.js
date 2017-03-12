/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-02
 */
import React from 'react';

import Header from './layout/header';
import Films from './sections/films';

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container-fluid">
                <Header/>
                <Films/>
            </div>
        );
    }

}

export default App;