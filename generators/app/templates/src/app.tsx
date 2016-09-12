import * as React from 'react'
import {render} from 'react-dom'
<% if (useMUI) { %>import * as configureTapEvent from 'react-tap-event-plugin'<% } %>

<% if (useMUI) { %>configureTapEvent()<% } %>

const container = document.querySelector('#root')

