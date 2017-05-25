import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';

import { AreaRow, SearchBox, SectionHeader } from './functionalComponents';

class AddLocationList extends Component {
    constructor(props) {
        super(props);

       this.createDataSource();
    }

    createDataSource() {
        const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            getSectionData,
            getRowData
        });
        const { dataBlob, sectionIds, rowIds } = this.formatData(this.props.areaList.areasList);

        this.dataSource = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
    }

    formatData(data) {
        // We're sorting by alphabetically so we need the alphabet
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // Need somewhere to store our data
        const dataBlob = {};
        const sectionIds = [];
        const rowIds = [];

        // Each section is going to represent a letter in the alphabet so we loop over the alphabet
        for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
            // Get the character we're currently looking for
            const currentChar = alphabet[sectionId];

            // Get area whose first name starts with the current letter
            const areas = data.filter((area) => area.name.toUpperCase().indexOf(currentChar) === 0);

            // If there are any area who have a first name starting with the current letter then we'll
            // add a new section otherwise we just skip over it
            if (areas.length > 0) {
                // Add a section id to our array so the listview knows that we've got a new section
                sectionIds.push(sectionId);

                // Store any data we would want to display in the section header. In our case we want to show
                // the current character
                dataBlob[sectionId] = { character: currentChar };

                // Setup a new array that we can store the row ids for this section
                rowIds.push([]);

                // Loop over the valid area for this section
                for (let i = 0; i < areas.length; i++) {
                    // Create a unique row id for the data blob that the listview can use for reference
                    const rowId = `${sectionId}:${i}`;

                    // Push the row id to the row ids array. This is what listview will reference to pull
                    // data from our data blob
                    rowIds[rowIds.length - 1].push(rowId);

                    // Store the data we care about for this row
                    dataBlob[rowId] = areas[i];
                }
            }
        }

        return { dataBlob, sectionIds, rowIds };
    }

    render() {
        const { containerStyle } = styles;

        return (
            <ListView
                style={containerStyle}
                dataSource={this.dataSource}
                renderRow={(data) => <AreaRow {...data} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <SearchBox />}
                renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
            />
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    separatorStyle: {
        flex: 1,
        height: 1,
        backgroundColor: '#DDD',
    }
};

const mapStateToProps = state => {
    return { areaList: state.areaListReducer };
};

export default connect(mapStateToProps, {})(AddLocationList);
