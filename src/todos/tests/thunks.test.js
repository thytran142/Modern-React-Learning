import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon, {fake} from 'sinon';
import { loadTodos } from "../thunks";


describe('The loadTodos thunk', () => {
    it('dispatches the actions in the success scenario', () => {
        const fakeDispatch = sinon.spy();

        // What we want to fake fetch returned?
        const fakeTodos = [{ text: '1'}, {text: '2'}];
        // When thunks get this URL, it will fake the response
        fetchMock.get('http://localhost:8080/todos', fakeTodos);

        const expectedFirstAction = { type: 'LOAD_TODO_IN_PROGRESS'};
        const expectedSecondAction = { type: 'LOAD_TODOS_SUCCESS', payload: { todos: fakeTodos }};

        await loadTodos()(fakeDispatch);

        // Define exactly what we want the actions?


        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        fetchMock.reset();
    })
})