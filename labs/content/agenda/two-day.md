---
title: Two Day Workshop
---

# Agenda

## Project setup and build tooling

A preliminary discussion for some general build tools and terminology. From this foundational basis, it will become apparent how these disparate pieces of build tooling coalesce to form a modern React application.

* NodeJS
* NPM
  * _Yarn_
* create-react-app
  * webpack
  * jest
  * Basic project structure

---

Lab 1 - Project setup

---

## React, Components, and Props

We will begin by illustrating some foundational goals of React and the problems that React is trying to solve. We'll segway into components (functional and class-based), including concepts such as lifecycle methods, expression bindings, and props.

* What is JSX?
* Functional components and what is a pure component
* Class-based components
  * render method
  * lifecycle methods
* Expression bindings
* Props
  * Sending props downward
  * children
  * Sending props upward

---

Lab 2 - Your first React component

---

## React and Local state

In this section, we introduce state, and how it is a core, foundational concept for dynamic components in React. We discuss `setState` and how it is used at the component level for local, component state.

* What is state?
* Updating state
* Sending state downward

---

Lab 3 - A stateful component

---

## Routing and Single Page Apps

In this section, we'll deep dive into react-router, and explore how this de facto declarative routing solution is used in a modern single-page application built with React.

* Using the `BrowserRouter`
  * `Route`
  * `Link`
  * Routing with components

---

Lab 4 - Simple routing

---

## Introduction to Redux

Redux is the definitive state-management solution for React. In this section, we'll explore some concepts of Redux like actions, action creators, reducers, and the store, while _briefly_ describing its relation to a React application

* The central tenets of Redux
* Central, global store
* Actions
* Action creators
* Reducers

---

Lab 5 - Redux

---

## React + Redux

In this section, we'll tie together the concepts of React _and_ Redux using the library react-redux, as well as some more advanced topics like async action creators (for data fetching and other async actions), as well as when it makes sense to integrate Redux into your application.

* When to integrate Redux
* Setting up React + Redux
* Async action creators
* Middleware

---

Lab 6 - React + Redux

---

## Special topics

In this section, we'll have a few hours to tailor the discussion towards client requests, e.g. form handling (Redux Form, Formik, final-form), styling (CSS in JS, CSS Modules, etc.), or whatever areas of particular need/concern are noted. We're here to help, and want to deliver the most meaningful and valuable content we can!

## Prerequisites

* Working understanding of JavaScript is essential
* Familiarity with ES2015, but not necessarily full understanding
* Some experience with build tooling is a plus, as is familiarity with the Node/NPM ecosystem
* Some experience with other frameworks (e.g. AngularJS, Angular, Vue, or even React)

## Technical requirements

* NodeJS LTS (8.9.0 at the time of this writing)
* NPM 5
* Yarn is a _nice to have_ would we'd recommend it

We'll send out an e-mail a week or so before the workshop with various links, including the repository for the workshops where a setup script can be run to validate environment setup. The less time we spend debugging specific environment issues, the more time we'll have for actual content 😄
