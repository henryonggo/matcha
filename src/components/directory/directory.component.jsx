import React from 'react';
import MenuItem from '../menu-item/menu-item.component';

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections:[{
                title: 'hats',
                imageUrl: '',
                id: 1
            },
            {
                title: 'jackets',
                imageUrl: '',
                id: 2
            }]
        }
    }

    render() {
        return (
            <div className='directory-menu'>
                {
                    this.state.sections.map(({title, imageUrl, id}) => (
                        <MenuItem key={id} title={title} imageUrl={imageUrl} />
                    ))
                }
            </div>
        )
    }
}

export default Directory;