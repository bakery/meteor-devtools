# Things **NOT** to do in Meteor

## Overpublishing user data

Limit fields published using Meteor.users.find()

```
Looks harmless right? Yeah, it would seem so, until you go into your browser console and type Meteor.users.find({}).fetch() and inspect the records that come back. You've just published all the data for any users attached to games, such as oauth tokens, bcrypted password hash, resume tokens, etc. This move will earn you the nickname 'LinkedIn' from your peers :)
```
via Josh Owens in [Meteor Security 101](http://joshowens.me/meteor-security-101/)

## Using client-side operations with collections

Do not invoke insert/update/remove directly on collections from client side, user methods instead

```
- Collections can only be updated through methods (no client-side operations).
- We'll use two-tiered methods along with the mutator pattern.
```
via David Weldon in [meteor: how we define methods](https://dweldon.silvrback.com/methods) 

  