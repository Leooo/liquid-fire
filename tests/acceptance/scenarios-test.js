/* global ranTransition */
import Ember from 'ember';
import { injectTransitionSpies } from '../helpers/integration';
import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance: Scenarios', {
  beforeEach() {
    injectTransitionSpies(this.application);
  }
});

test('nested liquid-outlets wait for their ancestors to animate', function(assert) {
  visit('/scenarios/nested-outlets/middle/inner');
  andThen(function(){
    visit('/scenarios/nested-outlets/middle2');
    Ember.run.later(function(){
      assert.equal(find('#inner-index').length, 1, "inner view exists during animation");
    }, 30);
  });
});

test('inner nested liquid-outlets can animate', function(assert) {
  visit('/scenarios/nested-outlets/middle/inner');
  visit('/scenarios/nested-outlets/middle');
  andThen(function(){
    ranTransition(assert, 'fade');
  });
});

test('liquid-outlet animate by outlet name', function(assert) {
  visit('/scenarios/in-test-outlet');
  andThen(function(){
    ranTransition(assert, 'toLeft');
  });
});


test('model-dependent transitions are matching correctly', function(assert) {
  visit('/scenarios/model-dependent-rule/1');
  andThen(() => click('a:contains(Next)'));
  andThen(() => {
    ranTransition(assert, 'toLeft');
    click('a:contains(Previous)');
  });
  andThen(() => {
    ranTransition(assert, 'toRight');
  });
});
