module.exports = [
  'react',
  'react-dom',
  <% if (useRedux) { %>'redux',
  'react-redux',<% } %>
  <% if (useRouter) { %>'react-router',<% } %>
  <% if (useMUI) { %>'material-ui',
  'react-tap-event-plugin'<% } %>
]