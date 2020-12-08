<!-- omit in toc -->
# Trade Study: Dependency Injection and IoC Containers

|                 |                    |
| --------------: | ------------------ |
|         *Date:* | 05/15/2021         |
|     *Decision:* | TSyringe or TypeDI |

- [Overview](#overview)
- [Goals](#goals)
- [Solutions](#solutions)
  - [Inversify](#inversify)
    - [Pros](#pros)
    - [Cons](#cons)
  - [TSyringe](#tsyringe)
    - [Pros](#pros-1)
    - [Cons](#cons-1)
  - [TypeDI](#typedi)
    - [Pros](#pros-2)
    - [Cons](#cons-2)
  - [injection-js](#injection-js)
    - [Pros](#pros-3)
    - [Cons](#cons-3)
  - [awilix](#awilix)
    - [Pros](#pros-4)
    - [Cons](#cons-4)
  - [Comparison](#comparison)
  - [Summary](#summary)
  - [Decision](#decision)

## Overview

Dependency Injection (DI) and the use of an Inversion of Control (IoC) container are essential strategies in reducing
coupling between components. Rather than directly instantiating dependencies, the classes/objects rely on the
dependencies being passed in, usually via constructor or sometimes properties. This allows dependencies to be easily
replaced by fake implementations and allows for more testable design with unit tests that do not have any dependencies
on things like the file system.

The IoC container is how those dependencies get registered during runtime (called
[Composition](https://blog.ploeh.dk/2011/07/28/CompositionRoot/)). The DI framework can then inject the contents of the
IoC container into the objects. These concepts are usually used hand-in-hand but can also be separate libraries.

## Goals

The goal of this trade study is to consider different frameworks that support Dependency Injection and an Inversion of
Control container within the Node environment. The main considerations to use for comparison are:

- Ease of Use - does the framework contain easy ways of injecting into the object?
- Well documented
- Injection types (constructor, property, field, etc.)
- TypeScript support
- Support for multiple scopes (singleton, transient, etc.)

## Solutions

### Inversify

[Inversify](https://inversify.io/) is one of the first DI frameworks available with TypeScript. It uses decorators (like
most of the frameworks) to inject types.

#### Pros

- Supports multiple injection types (constructor, property).

#### Cons

- Documentation is mostly example based and not as mature as you would hope.

### TSyringe

[TSyringe](https://github.com/microsoft/tsyringe) is a DI library written for TypeScript and maintained by Microsoft.

#### Pros

- Supported by Microsoft

#### Cons

- Limited documentation.
- Only supports constructor injection by design.

### TypeDI

[TypeDI](https://github.com/typestack/typedi) is a popular DI framework. It's syntax seems to be derived from Spring and
will look familiar to Java developers.

#### Pros

- Active development

#### Cons

- Generally has good documentation but some pages are blank.

### injection-js

[injection-js](https://github.com/mgechev/injection-js) is an extraction of the DI code from Angular.

#### Pros

- Very simple
- Users Angular documentation so it is pretty robust.

#### Cons

- Not as active development, is pinned to the Angular 4 DI code

### awilix

[awilix](https://github.com/jeffijoe/awilix) is another popular DI framework written in TypeScript. It sets itself apart
as not being a decorator-based framework unlike all the other ones looked at above, so it does not require
`reflect-metadata` or similar libraries to be added.

#### Pros

- Does not depend on experimental decorators which might be obsolete eventually.

#### Cons

- Written in TypeScript but usage looks much less "typescript-y" than the other libraries.
- Requires more code without decorators.

### Comparison

The table below summarizes the differences between the solutions:

| Solution     | Supports multiple scopes | TypeScript usage | Ease of Use | Well Documented | Injection Types       |
| ------------ | ------------------------ | ---------------- | ----------- | --------------- | --------------------- |
| Inversify    | ✔                        | ✔                | ✔           | ⚠               | Constructor, Property |
| TSyringe     | ✔                        | ✔                | ✔           | ⚠               | Constructor           |
| TypeDI       | ✔                        | ✔                | ✔           | ✔               | Constructor, Property |
| injection-js | ✔                        | ✔                | ✔           | ✔               | Constructor, Property |
| awilix       | ✔                        | ⚠                | ⚠           | ⚠               | Constructor           |

### Summary

Overall most of the dependency injection frameworks have the same feature sets and will work for our usage for this
project. Most of the differences end up being rather nitpicky. The 2 major differences are around injection types and
injection syntax.

Awilix is the lone framework looked at that has next to no dependencies; all the decorator based frameworks require a
package such as `reflect-metadata` to be imported along with it and require `experimentalDecorators` and
`emitDecoratorMetadata` to be set to `true` in the `tsconfig.json` file. As the property names indicate, decorators are
an [experimental feature in TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html) and could change
in the future. Decorator usage is popular with TypeScript projects and makes the code much more readable, so it should
be alright to use them but this is something to consider.

The last major differentiator is the ways that you can inject into your classes; either constructor injection or
property injection. This is a philosophical discussion where many people feel that constructor injection is the best way
to inject types, but property injection can also be helpful at times. Inversify says to [prefer constructor
injection](https://github.com/inversify/InversifyJS/blob/master/wiki/property_injection.md) when possible, but TSyringe
goes one step further and explicitly states that [not supporting property injection is a design
decision](https://github.com/microsoft/tsyringe#non-goals). If there is a strong need for property injection, that could
be a differentiator that would dictate using one framework over another, but going with a framework that restricts it
(and in the process prevents a [potential
anti-pattern](https://stackoverflow.com/questions/1503584/dependency-injection-through-constructors-or-property-setters))
could lead to a more reliable codebase.

### Decision

In an effort to make the codebase as uniform as possible and prevent potential anti-patterns, the recommendation is to
use TSyringe. From a DI perspective it is near identical to all the other decorator based frameworks but it is the only
one that is opinionated on the injection types. The documentation should be good enough for our simple use case, and we
have the added benefit of building a Microsoft-supported CLI tool on top of a Microsoft-supported DI framework!

If requiring property injection is preferred, the recommendation would be to use TypeDI as the documentation is better
organized and easier to understand than the Inversify documentation.