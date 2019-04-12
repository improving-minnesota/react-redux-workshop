---
title: Workshop Agenda
---

This workshop is typically run as a one- or two-day session. The slides and materials remain the same between the two. Obviously we can't cover quite as much information in a one-day session, so sections we won't be covering are marked below.

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

## React, Components, State, and Props

We will begin by illustrating some foundational goals of React and the problems that React is trying to solve. We'll segue into components (functional and class-based), including concepts such as lifecycle methods, expression bindings, state, and props.

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
* State
  * What is state?
  * Using component state
  * Updating state
  
---

Lab 2 - Your first React component

---

## Routing and Single Page Apps

In this section, we'll deep dive into react-router, and explore how this de-facto declarative routing solution is used in a modern single-page application built with React.

* Using the `BrowserRouter`
  * `Route`
  * `Link`
  * Routing with components

---

Lab 3 - Routing

---

## Introduction to Redux

> Note: One-day workshops will skip this section

Redux is the definitive state-management solution for React. In this section, we'll explore some concepts of Redux like actions, action creators, reducers, and the store, while _briefly_ describing its relation to a React application

* The central tenets of Redux
* Central, global store
* Actions
* Action creators
* Reducers

## React + Redux

> Note: One-day workshops will skip this section

In this section, we'll tie together the concepts of React _and_ Redux using the library react-redux, as well as some more advanced topics like async action creators (for data fetching and other async actions), as well as when it makes sense to integrate Redux into your application.

* When to integrate Redux
* Setting up React + Redux
* Async action creators
* Middleware

---

Lab 4 - React + Redux

---

## Context

React components can build localized containers to share state, without resorting to a global-level solution like Redux.

* What is Context?
* How does it compare to Redux?
* When should I use it?

## Forms

How do we prompt and collect information from the user? We'll cover Forms, including how to build, validate, and process user input.

* Form solutions
* Building a simple form
* Power of in-page validation

---

Lab 5 - Forms

---

## Hooks

Advanced component patterns let us supercharge functional components. We'll discuss how you can integrate your components with context, state, and other strata.

## Special topics

Time-permitting, we'll cover more advanced/niche topics like next-gen React features, static typing, design patterns, and popular third-party libraries. We try to set aside a few hours to tailor the discussion towards topics of interest, so let us know if you have subjects/libraries you'd like us to cover. We're here to help, and want to deliver the most meaningful and valuable content we can!

## Capstone

We've reached the end! One last lab to cover the breadth of the covered topics. If we run out of time this is a good exercise to work at home.

---

Lab 5 - Capstone

---

## Prerequisites

* Working understanding of JavaScript is essential
* Familiarity with ES2015, but not necessarily full understanding
* Some experience with build tooling is a plus, as is familiarity with the Node/NPM ecosystem
* Some experience with other frameworks (e.g. AngularJS, Angular, Vue, or even React)

## Technical requirements

* Latest NodeJS LTS
* NPM (comes with NodeJS)
* Yarn is a _nice to have_ but is not required--although we would strongly recommend it!

We'll send out an e-mail a week or so before the workshop with various links and instructions for setting up your computer. The less time we spend debugging specific environment issues, the more time we'll have for actual content 😄
