import React from 'react'
import * as ActionNames from '../ActionNames';

var LanguageStateContext = React.createContext()
var LanguageDispatchContext = React.createContext()

function LanguageReducer(state, action) {
	switch (action.type) {
		case ActionNames.ADD_LANGUAGE:
			return { ...state, language: action.data.language, error: null }
		case ActionNames.ADD_LANGUAGE_FAILED:
			return { ...state, error: action.data.error, language: null }
		case ActionNames.LANGUAGE_LIST:
			return { ...state, languages: action.data.languages }
		case ActionNames.REMOVE_LANGUAGE:
			return { ...state, language:null}
		case ActionNames.GET_LANGUAGE:
			return { ...state, language:action.data.language}
		case ActionNames.UPDATE_LANGUAGE:
			return {...state,language:null}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function LanguageProvider({ children }) {
	var [state, dispatch] = React.useReducer(LanguageReducer, {
		language: null,
		languages: [],
		error: null,
	})

	return (
		<LanguageStateContext.Provider value={state}>
			<LanguageDispatchContext.Provider value={dispatch}>
				{children}
			</LanguageDispatchContext.Provider>
		</LanguageStateContext.Provider>
	)
}

function useLanguageState() {
	var context = React.useContext(LanguageStateContext)
	if (context === undefined) {
		throw new Error('useLanguageState must be used within a LanguageProvider')
	}
	return context
}

function useLanguageDispatch() {
	var context = React.useContext(LanguageDispatchContext)
	if (context === undefined) {
		throw new Error('useLanguageDispatch must be used within a LanguageProvider')
	}
	return context
}

export { LanguageProvider, useLanguageState, useLanguageDispatch }

