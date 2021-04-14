import {expect} from 'chai';
import {todos} from '../reducers';

describe('The todos reducer', () => {
    it('Add a new todo when CREATE_TODO action is received', () =>{
        var fakeTodo = {text: 'hello', isCompleted: false}
        var fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo
            }
        }
        var originalState = {isLoading: false, data: []}
        var expected = {
            isLoading: false,
            data: [fakeTodo],
        }

        var actual = todos(originalState, fakeAction)
        expect(actual).to.deep.equal(expected)
    });
});