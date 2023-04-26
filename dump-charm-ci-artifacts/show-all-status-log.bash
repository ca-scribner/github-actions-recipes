# Loops through all models to record `juju show-status-log` for every model, unit and application
for model in `juju list-models --format yaml | yq e '.models[].name'`; do
    echo juju show-status-log --days 1 --type model $model
    juju show-status-log --days 1 --type model $model

	for application in `juju status -m $model --format yaml | yq e '.applications | keys | .[]'`; do
		echo juju show-status-log --days 1 --type application $application
		juju show-status-log --days 1 --type application $application
	done
	for unit in `juju status -m $model --format yaml | yq e '.applications[].units | keys | .[]'`; do
        echo juju show-status-log --days 1 --type unit $unit
        juju show-status-log --days 1 --type unit $unit
	done
done	
