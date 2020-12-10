import React from 'react'
import * as ActionNames from '../ActionNames';

var AnswerStateContext = React.createContext()
var AnswerDispatchContext = React.createContext()

function AnswerReducer(state, action) {
	switch (action.type) {
		case ActionNames.ADD_ANSWER:
			return { ...state, answer: action.data.answer, error: null }
		case ActionNames.ADD_ANSWER_FAILED:
			return { ...state, error: action.data.error, answer: null }
		
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function AnswerProvider({ children }) {
	var [state, dispatch] = React.useReducer(AnswerReducer, {
		answer: null,
	})

	return (
		<AnswerStateContext.Provider value={state}>
			<AnswerDispatchContext.Provider value={dispatch}>
				{children}
			</AnswerDispatchContext.Provider>
		</AnswerStateContext.Provider>
	)
}

function useAnswerState() {
	var context = React.useContext(AnswerStateContext)
	if (context === undefined) {
		throw new Error('useAnswerState must be used within a AnswerProvider')
	}
	return context
}

function useAnswerDispatch() {
	var context = React.useContext(AnswerDispatchContext)
	if (context === undefined) {
		throw new Error('useAnswerDispatch must be used within a AnswerProvider')
	}
	return context
}

export { AnswerProvider, useAnswerState, useAnswerDispatch }

