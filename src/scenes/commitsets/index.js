import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'
import { setAlert } from 'actions/ui'

class Commitsets extends Component {
	formatDate = string => {
		const [date, time] = string.split('T')
		const [t] = time.split('.')
		return `${date} ${t}`
	}

	goToCommitSet = link => e => {
		e.preventDefault()
		history.push(`/commitset/${encodeURIComponent(link)}`)
	}

	componentDidMount() {
		const { client } = this.props
		client.get_dcommitsets()
	}

    render() {
    	const { list } = this.props
	  	const columns = [{
		    Header: 'Commit',
		    accessor: 'dcommitset',
		    className: 'text-center',
		    Cell: props => <a href={`/commitset/${props.value}`} onClick={this.goToCommitSet(props.value)}>{props.value}</a>
	  	}, {
		    Header: 'Build Time',
		    accessor: 'buildtime',
		    className: 'text-center',
		    Cell: props => <span className='number'>{ this.formatDate(props.value)}</span>
	  	}]
        return (
            <div className="h-100">
            	<h1>Commitsets</h1>
            	<div>
	            	<ReactTable
	            		showPaginationTop={true}
	            		showPaginationBottom={false}
	            		defaultPageSize={5}
	            		defaultSorted={[{id: 'buildtime',desc: true}]}
	            		previousText="Prev"
			    		data={list}
			    		columns={columns} />
	    		</div>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commitsets: {list, buildCommit}}) =>
    ({
        client: client,
        list: list,
    })

export default connect(mapStateToProps)(Commitsets)