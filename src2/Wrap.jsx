import React, { PureComponent, PropTypes } from 'react';

function noId() {
    return function (Comp) {
        return class NoID extends PureComponent {
            render() {
                const { name } = this.props;
                return (
                    <Comp name={name} />
                );
            }
        };
    };
}

export default noId;
