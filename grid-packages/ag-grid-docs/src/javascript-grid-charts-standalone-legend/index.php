<?php
$pageTitle = "Chart Legend";
$pageDescription = "ag-Grid is a feature-rich data grid that can also chart data out of the box. Learn how to chart data directly from inside ag-Grid.";
$pageKeyboards = "Javascript Grid Charting";
$pageGroup = "feature";
include '../documentation-main/documentation_header.php';
?>

<h1 class="heading-enterprise">Standalone Charts - Legend</h1>

<p class="lead">
    A legend makes it easier to tell at a glance which series or series items correspond to what pecies of data.
    This section describes legend's options and layout behavior.
</p>

<h2>Position</h2>

<p>
    A legend can be positioned to any side of a chart:
</p>

<p>
    <img alt="Legend Positon" src="legend-position.gif" style="margin-bottom: 0px; max-width: 70%">
</p>

<snippet language="ts">
legend: {
    position: 'right' // 'bottom', 'left', 'top'
}
</snippet>

<h2>Visibility</h2>

<p>
    A legend is shown by default. To hide it, use the <code>enabled</code> config:
</p>

<p>
    <img alt="Legend Enabled" src="legend-enabled.gif" style="margin-bottom: 0px; max-width: 70%">
</p>

<snippet language="ts">
legend: {
    enabled: false
}
</snippet>

<h2>Layout</h2>

<p>
    Whenever the size of a chart changes, the legend layout is triggered.
    If the legend is vertical (positioned to the <code>right</code> or <code>left</code> of a chart),
    the layout algorithm tries to use the minimum number of columns possible to render all legend items
    using current constraints. Notice how the number of columns in a legend increases as the height of
    a chart shrinks:
</p>

<p>
    <img alt="Legend Vertical Layout Size" src="layout-vertical-size.gif" style="margin-bottom: 0px; height: 250px; max-width: 100%">
</p>

<p>
    If the legend is horizontal (positioned to the <code>bottom</code> or <code>top</code> of a chart),
    the layout algorithm tries to use the minimum possible number of rows. If a chart is not wide enough,
    the legend will keep subdividing its items into rows until everything fits:
</p>

<p>
    <img alt="Legend Horizontal Layout Size" src="layout-horizontal-size.gif" style="margin-bottom: 0px; width: 100%">
</p>

<h2>Constraints</h2>

<p>
    A few things other than the width and height of a chart can affect legend's layout and that is the amout of spacing
    between and within the legend items. For example, <code>layoutHorizontalSpacing</code> controls the amount
    of spacing between adjacent horizontal legend items:
</p>

<p>
    <img alt="Legend Horizontal Spacing Size" src="layout-horizontal-spacing.gif" style="margin-bottom: 0px; width: 300px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    layoutHorizontalSpacing: 16
}
</snippet>

<p>
    <code>layoutVerticalSpacing</code> controls the amount of spacing between adjacent vertical legend items.
    Notice how in this case the increased vertical spacing even forces the legend to use another column to fit
    all of its items:
</p>

<p>
    <img alt="Legend Vertical Spacing Size" src="layout-vertical-spacing.gif" style="margin-bottom: 0px; height: 250px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    layoutVerticalSpacing: 8
}
</snippet>

<p>
    And the <code>itemSpacing</code> config is responsible for the amount of spacing within a legend item, between the marker
    and the label:
</p>

<p>
    <img alt="Legend Item Spacing Size" src="layout-item-spacing.gif" style="margin-bottom: 0px; width: 300px; max-width: 100%">
</p>

<snippet language="ts">
legend: {
    itemSpacing: 8
}
</snippet>

<?php include '../documentation-main/documentation_footer.php'; ?>
