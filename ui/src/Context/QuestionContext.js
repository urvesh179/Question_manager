import React from 'react'
import * as ActionNames from '../ActionNames';

var QuestionStateContext = React.createContext()
var QuestionDispatchContext = React.createContext()

function QuestionReducer(state, action) {
	switch (action.type) {
		case ActionNames.ADD_QUESTION:
			return { ...state, question: action.data.question, error: null }
		case ActionNames.ADD_QUESTION_FAILED:
			return { ...state, error: action.data.error, question: null }
		case ActionNames.QUESTION_LIST:
			return { ...state, questions: action.data.questions }
		case ActionNames.REMOVE_QUESTION:
			return { ...state, question:null}
		case ActionNames.GET_QUESTION:
			return { ...state, question:action.data.question}
		case ActionNames.UPDATE_QUESTION:
			return {...state,question:null}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function QuestionProvider({ children }) {
	var [state, dispatch] = React.useReducer(QuestionReducer, {
		question: null,
		questions: [],
		error: null,
	})

	return (
		<QuestionStateContext.Provider value={state}>
			<QuestionDispatchContext.Provider value={dispatch}>
				{children}
			</QuestionDispatchContext.Provider>
		</QuestionStateContext.Provider>
	)
}

function useQuestionState() {
	var context = React.useContext(QuestionStateContext)
	if (context === undefined) {
		throw new Error('useQuestionState must be used within a QuestionProvider')
	}
	return context
}

function useQuestionDispatch() {
	var context = React.useContext(QuestionDispatchContext)
	if (context === undefined) {
		throw new Error('useQuestionDispatch must be used within a QuestionProvider')
	}
	return context
}

export { QuestionProvider, useQuestionState, useQuestionDispatch }

