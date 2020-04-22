import * as React from 'react';
import renderer from 'react-test-renderer';
import WaitTime from '../WaitList'


it(`renders correctly`, () => {
//   const tree = renderer.create(<Text>Snapshot test!</Text>).toJSON();

//   expect(tree).toMatchSnapshot();

    const tree = renderer.create(<WaitTime>Test</WaitTime>)
    expect(tree).toMatch(1)
});