import xml.etree.ElementTree as ET


# def print_branch(node, tree):

#     for childNode in node:

#         if childNode.tag == 'branch':

#             tree['children'].append()


#             # Print attributes
#             for grandChildNode in childNode:
#                 if grandChildNode.tag == 'attribute' and grandChildNode.attrib['name'] == 'latin_name':
#                     print level, grandChildNode.attrib['value']

#                 if grandChildNode.tag == 'branch':
#                     print_branch(grandChildNode, level + 1)

def parseNode(node):

    nodeDict = dict()
    nodeDict['name'] = ''
    nodeDict['children'] = []

    if node.tag == 'branch':
        for child in node:
            if child.tag == 'attribute':
                if child.attrib['name'] == 'latin_name':
                    nodeDict['name'] = child.attrib['value']

    for child in node:
        if child.tag == 'branch':
            childDict = parseNode(child)
            nodeDict['children'].append(childDict)

    return nodeDict

if __name__ == '__main__':

    tree = ET.parse('/Users/pablo/Downloads/classif_A_03-04-16.xml')
    root = tree.getroot()

    treeLife = parseNode(root)